const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const dotenv = require("dotenv")

dotenv.config();
const PORT = process.env.PORT || 3000;
router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
  //__dirname : It will resolve to your project folder.
});
app.use("/", router);

app.listen(PORT);

console.log("Running on Localhost", PORT)
