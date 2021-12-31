export default function handler (req,res){
    if(req.method === !"GET"){
        res.status("405").send({message:"Only post requests allowed"})
    }
    res.send("All Items")
}