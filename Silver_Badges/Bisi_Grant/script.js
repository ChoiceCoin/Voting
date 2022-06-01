const express = require("express");
const path= require("path");
const app = express();


// define directory name
// const __dirname = path.resolve();

app.use(express.static(__dirname + '/src'));



// root directory
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

// Port
const port = process.env.PORT || 5000 ;

// Listening to NodeJs App
app.listen(port, ()=> {
    console.log(`App is listening on port 5000`)  
});
