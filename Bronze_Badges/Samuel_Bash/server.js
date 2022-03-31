import express from "express";
import path from 'path';
const app = express();


// define directory name
const __dirname = path.resolve();

// add it to read .css, .js etc
app.use(express.static(__dirname + '/src'));



// get root URL
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname + '/src/index.html'));
});

// Port
const port = 3000;

// Listening to server
app.listen(port, ()=> {
    console.log(`Server is listening on port ${port}`)
    
});