const express =  require("express");
const app =  express();


//================
//    STATIC DIR 
//===============
app.use(express.static(__dirname + '/static'));

//================
//    ROUTES 
//===============
app.get("/", (req, res)=>{
    return res.sendFile("main.html", {root: __dirname + "/public"});
});



const serverPort =  8000;

app.listen(serverPort,()=> console.log(`Server is listeniing on port ${serverPort}`));