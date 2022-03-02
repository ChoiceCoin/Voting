const http = require("http");
const express = require("express");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
app.use(cors());

const participantArray = [];

app.get("/", (req, res) => {
  res.send(`Server Up`);
});

app.get("/data", (req, res) => {
  res.json({ participants: participantArray });
});

app.post("/devform", (req, res) => {
  const body = [];
  req.on("data", (slug) => {
    body.push(slug);
  });
  return req.on("end", () => {
    const parsedBody = Buffer.concat(body).toString();
    const splitData = parsedBody?.split("&");
    const formData = {
      name: decodeURIComponent(splitData[0].split("=")[1]),
      discord_id: decodeURIComponent(splitData[1].split("=")[1]),
      github_url: decodeURIComponent(splitData[2].split("=")[1]),
      twitter_url: decodeURIComponent(splitData[3].split("=")[1]),
      wallet_address: decodeURIComponent(splitData[4].split("=")[1]),
    };

    participantArray.push(formData);

    res.writeHead(302, {
      Location: "https://choice-rewards.netlify.app/form",
    });
    return res.end();
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log("Go!!!");
});
