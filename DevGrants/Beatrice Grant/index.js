const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const router = express.Router();

dotenv.config();

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render(path.join(__dirname + "/public/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port... ${port}`));
