//connecting to server

const http = require("http")
const fs = require('fs')
//const fs = require('fs')
const port = 3000

const server = http.createServer(function(req,res){
    res.writeHead(200, { 'content-type':'text/html' })
    //connect to the html file
    fs.readFile('index.html',function(error,data){
        if(error){
            res.writeHead(404)
            res.write('Error! File Not Found!')
        }else{
            res.write(data)
        }
        res.end()
    })
    
})

//listening on port 3000
server.listen(port, function(error){
    if(error){
        console.log("Something went wrong")
    }else{
        console.log("server is listening on port "+port);
    }
})





