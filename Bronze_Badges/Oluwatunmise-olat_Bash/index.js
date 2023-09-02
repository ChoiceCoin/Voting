const express = require("express");
const path = require("path");
const app = express();

//middlewares
app.use(express.static(__dirname + '/assets'));

// App Config
app.set("views", "./public");

//Entry point to application
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname + '/public/main.html'));
});

const port = 5000;

app.listen(port, ()=>console.log(`Server is listening on port ${port}`));