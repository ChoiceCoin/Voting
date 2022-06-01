function startVote (req, res){
    let error = "";
    switch (req.method){
        case "POST":
            const { adminkey } = req.body;
            if (!adminkey) return res.render("start", {error: "Invalid Administrative key"});
            res.end(JSON.stringify(req.body));
            break;
        case "GET":
            error = "";
            res.render("start", {error});
            break;
        default:
            return;
    }
};

function endVote (req, res){
    let error = "";
    switch (req.method){
        case "POST":
            const { adminkey } = req.body;
            if (!adminkey) return res.render("end", {error: "Invalid Administrative key"});
            res.end(JSON.stringify(req.body));
            break;
        case "GET":
            error = "";
            res.render("end", {error});
            break;
        default:
            return;
    }
};



module.exports = { startVote, endVote };