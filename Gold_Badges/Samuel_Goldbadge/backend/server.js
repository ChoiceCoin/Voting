const express = require("express"); 
const cors = require("cors");
const proposal = require('./src/controller');



// Configuring database
const mongoose = require('mongoose');
const connectionString =  process.env.MONGODB_URI || "mongodb://localhost/proposals";


// Connecting to the database
mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    }, (err) => {
        if(err) {
            console.log(err)
        } else {
            console.log("Database sucessfully connected");
        }
    } 
    )

// connecting to express server
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// Home Url 
app.get('/', (req,res) => {
    res.json('Proposal backend Api is working');
})

// add a submitted proposal to database
app.post('/data', (req,res) => {proposal.handleCreateProposal(req,res)});

// Retrieve the data
app.get('/data', (req,res) => {proposal.handleGetAllProposals(req,res)});

// listening to server
app.listen(process.env.PORT || 3000, ()=> {
	console.log(`app is working on port ${process.env.PORT}`);
});