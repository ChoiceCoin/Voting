const express = require("express");
const app = express();
const morgan = require("morgan")(":method :url :status");
const routes = require("./routes/admin");

// Middlewares
app.use([express.urlencoded({extended: false}), express.json(), morgan]);
app.use(routes);
app.use(express.static(__dirname + '/assets'));

// App Config
app.set("views", "./public");
app.set("view engine", "ejs");

//Routes
app.get("/", (req, res)=>{
    res.render('index');
});

app.get("/vote", (req, res)=>{
    res.render('vote');
});

app.get("/algosigner/vote", (req, res)=>{
    res.render("algosigner_vote");
});

app.get("/algow/vote", (req, res)=>{
    res.render("myalgowallet_vote");
});

app.get("/myalgo-connect", async (req, res)=>{
    await connectToMyAlgo();
})

// Port to Listen On
const port = 8000;

app.listen(port, ()=>console.log(`Server is listening on port ${port}`));