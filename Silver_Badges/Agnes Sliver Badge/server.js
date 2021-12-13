/** @format */

import express from "express";
import cors from "cors";
import path from "path";
// const nodemon = require("nodemon");
// start express app
const app = express();

// set ejs config
app.set("view engine", "ejs");

// define directory name
const __dirname = path.resolve();

// add it to read .css, .js etc
app.use(express.static(__dirname + "/src"));

// middlewares
app.use(cors());
// app.use(nodemon);
app.use(express.json());

// using res.render to load an ejs view
//Routes

app.get("/algowallet", (req, res) => {
  res.render("algowallet");
});

app.get("/algosigner", (req, res) => {
  res.render("algosigner");
});

app.get("/", (req, res) => {
  res.render("index");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
