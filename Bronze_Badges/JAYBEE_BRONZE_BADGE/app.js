const express=require("express")
const bodyparser=require("body-parser")
const mongoose=require("mongoose")
const {validate_address,create_candidates_address,vote,calculate_votes,find_winner}=require('./main')


const app=express()
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const algosdk=require('algosdk');

//This helps in connecting the client with the algorand network
const algoServer='https://testnet-algorand.api.purestake.io/ps2'
const algoPort='';
const token = {
    'X-API-Key': 'Xy8NsXxfJg2cQ2YQ4pax6aLrTcj55jZ9mbsNCM30 '
 }
let algoClient = new algosdk.Algodv2(token, algoServer, algoPort);
app.use(express.static(__dirname+"/public"))//setting the public directory you want to use
app.use(bodyparser.urlencoded({extended:false}))//body parser to parse through requests incase of post methods from forms
app.use(bodyparser.json());


//Connecting to the mongodb
mongoose.connect("mongodb://localhost/Choice",
         {useNewUrlParser:true,
         useUnifiedTopology:true})
         .then(res => console.log('Connected to the databse succcessfully'))
         .catch(err => console.log("There was an error connecting to the database"))




//Schemas and Models

var ElectionSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    escrowWalletAddress:{
        type:String,
        required:true
    },
    candidates:{
        type:Array,
        required:true
    },
    voters:{
        type:Array,
        required:true
    },
    choice_per_vote:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    },
    dateCreated:{
        type:Date,
        default:Date.now
    }
})
var Election=mongoose.model("Election",ElectionSchema)



//GET method routes
app.get("/",function(req,res){
    res.render("home.ejs")
})

app.get("/create_vote",async function(req,res){
    res.render('create_vote.ejs')
})

app.get("/join_vote",async function(req,res){
    res.render("join_vote.ejs")
})
app.get("/find_vote",async function(req,res){
    res.render("find_vote.ejs")
})

app.get("/vote_info/:electionId",async function(req,res){
    const election=await Election.findById(req.params.electionId)
    const results=await calculate_votes(election.candidates,algoClient)
    res.render("vote_info.ejs",{election:election,results:find_winner(results)})
})

app.get("/vote/:electionId/:voterId",async function(req,res){
    const election=await Election.findById(req.params.electionId)
    const results=await calculate_votes(election.candidates,algoClient)
    const has_voted_list=has_voted(election)
    if (has_voted_list.includes(req.params.voterId)){
        res.render("invalid_wallet.ejs",{message:"This voter has voted already"})
    }
    console.log("reached here")
    console.log(results)
    res.render("vote.ejs",{election:election,voterId:req.params.voterId,results:find_winner(results)})
})


//POST methods route

app.post("/find_vote",async function(req,res){
    try {
        const election=await Election.findById(req.body.electionId)  
        if(election){
            res.redirect(`/vote_info/${election._id}`)
        }
    } catch (error) {
        console.log(error)
    }
})

app.post("/create_vote",async function(req,res){
    try {
        console.log(req.body)
        const is_valid=validate_address(req.body.address,req.body.mnemonic,algoClient,req.body.choice_per_vote,req.body.voters)
        if(!is_valid['status']){
            res.render("invalid_wallet.ejs",{message:is_valid["message"]})
            console.error(is_valid['message'])
        }else{
            const escrowWalletKey = algosdk.mnemonicToSecretKey(req.body.mnemonic)['sk'];
            const options=await create_candidates_address(escrowWalletKey,req.body.address,algoClient,req.body.candidates.split(","))
            const election=await Election.create({
                title:req.body.title,
                escrowWalletAddress:req.body.address,
                candidates:options,
                voters:generaterandom(9,req.body.voters),
                choice_per_vote:req.body.choice_per_vote
            })
            res.render("admin_vote_info.ejs",{election:election})
        }
    } catch (error) {
        console.log(error)
    }

})

app.post("/join_vote/",async function(req,res){
    try {
    const election=await Election.findById(req.body.electionId)
    const voterId=req.body.voterId

    if(!election){
        res.render("invalid_wallet.ejs",{message:"No matching election Id was found"})
    }
    if(!check_voter_id(election,voterId)){
        res.render("invalid_wallet.ejs",{message:"Voter id for election not found"})
    }
    res.redirect(`/vote/${election._id}/${voterId}`)
    } catch (error) {
        console.log(error)
    }
    
})


app.post("/vote/:electionId/:voterId",async function(req,res){
    const election=await Election.findById(req.params.electionId)
    const voterId=req.params.voterId
    const has_voted_list=has_voted(election)
    const escrow_key = algosdk.mnemonicToSecretKey(req.body.mnemonic)['sk'];
    if (has_voted_list.includes(voterId)){
        res.render("invalid_wallet.ejs",{message:"This voter has voted already"})
    }
    console.log(req.body)
    let index=get_index(election,req.body.voted_for)
    console.log(index)
    let voted=await vote(escrow_key,election.escrowWalletAddress,election.candidates,index,algoClient,election.choice_per_vote)
    console.log(voted['message'])
    if(!voted['status']){
        return false
    }
    else{
    let set_voted=set_has_voted(election,voterId)
    console.log(set_voted)
    if(has_voted(set_voted).length==set_voted.candidates.length){
        set_voted.status=true
        set_voted.save(function(err,doc){
            if(err){
                console.log(err)
            }
        res.redirect(`/vote_info/${req.params.electionId}`)
        })
    }
    }
})


//Socket IO part
io.on("connection",(socket)=>{
        console.log("Websocket connected")
    socket.on("join_vote_info",async(data)=>{
        console.log(data)
        socket.join(data)
    })
    socket.on("vote",async(data)=>{
        const election=await Election.findById(data.election_id)
        const voterId=data.voter_id
        const has_voted_list=has_voted(election)
        console.log(has_voted_list)
        const escrow_key = algosdk.mnemonicToSecretKey(data.escrowWalletMnemonic)['sk'];
        if (has_voted_list.includes(voterId)){
            res.render("invalid_wallet.ejs",{message:"This voter has voted already"})
        }
        console.log(data)
        let index=get_index(election,data.voted_for)
        console.log(index)
        let voted=await vote(escrow_key,election.escrowWalletAddress,election.candidates,index,algoClient,election.choice_per_vote)
        let set_voted= await set_has_voted(election,voterId)
        console.log(set_voted)
        if(has_voted(set_voted).length==set_voted.candidates.length){
            set_voted.status=true
            set_voted=await set_voted.save()
        }
        const results=await calculate_votes(set_voted.candidates,algoClient)
        io.to(data.election_id.toString()).emit('voted', {results:results,status:set_voted.status});
    })
})


//several helper functions
function check_voter_id(election,voterId){
    let has_voter_id=false
    for(let i=0;i<election.voters.length;i++){
        if(election.voters[i].id==voterId){
            has_voter_id= true
        }
    }
    return has_voter_id
}

function get_index(election,option){
    const list_of_options=election.candidates
    for(let i=0;i<list_of_options.length;i++){
        console.log(list_of_options[i],option)
        if(list_of_options[i]['candidate']==option){
            return i+1
        }
    }
}

function has_voted(election){
    let has_voted_list=[]
    election.voters.forEach((element)=>{
        if(element.has_voted){
            has_voted_list.push(element['id'])
        }
    })
    return has_voted_list
}

async function set_has_voted(election,voterId){
    let new_elect
    console.log(election.voters,voterId)
    for(let i=0;i<election.voters.length;i++){
        if(election.voters[i]['id']==voterId){
            election.voters[i]['has_voted']=true
            new_elect=await election.save()
        }
    }
    return new_elect
    
}

function generaterandom(length,n){
    let list_of_id=[]
    for(let a=0;a<n;a++){
        let result=""
    x=['0','1','2','3','4','5','6','7','8','9']
    for(let i=0;i<length;i++){
        result+=x[Math.floor(Math.random()*(x.length-1))]

    }
        list_of_id.push({
            id:result,
            has_voted:false
        })
    }
    
    return list_of_id
}


server.listen("8000",function(){
    console.log("Server now listening on port 8000")
})