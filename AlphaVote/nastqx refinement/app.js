const express = require("express");
const cors = require("cors");
//import algosdk


//start app
const app = express();

// Read .css, .js etc
app.use(express.static(__dirname + "/static"));

// Set ejs config
app.set("view engine", "ejs");

// Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.render("index");
});

// Listening to port 3001
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server is listening on port ${port}`));


