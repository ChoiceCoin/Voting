const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const middlewares = require("./middlewares");
const app = express();

const { Election, Candidate } = require("./models");
const { indexerClient, ASSET_ID } = require("./config");

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🦄✨Choice Coin API👋✨🦄",
  });
});

app.get("/committed/:address", async (req, res) => {
  const candidates = await Candidate.find();
  const addresses = candidates.map((el) => el.address);

  try {
    let txnAmt = 0;

    const pastTxn = await indexerClient
      .searchForTransactions()
      .address(req.params.address)
      .addressRole("sender")
      .assetID(ASSET_ID)
      .txType("axfer")
      .do();
    const txns = pastTxn["transactions"];

    txns.forEach((item) => {
      const txn = item["asset-transfer-transaction"];
      if (addresses.includes(txn["receiver"])) {
        txnAmt += txn["amount"] / 100;
      }
    });

    return res.status(200).json({
      status: "success",
      message: "Choice committed returned successfully",
      data: { amount: txnAmt },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "An error occured while fetching data",
    });
  }
});

// For internal use only
app.post("/elections/create", async (req, res) => {
  const auth = req.headers["x-authorization-id"];
  // check if header exists
  if (!auth) {
    return res.status(401).json({
      status: "error",
      message: "You are not authorized to make this request",
    });
  }

  // check if token passed matches the one stored in the environment variable
  if (auth !== process.env.AUTHORIZATION_ID) {
    return res.status(401).json({
      status: "error",
      message: "You are not authorized to make this request",
    });
  }

  const { body: data } = req;

  try {
    const new_election = await Election.create({});

    // create candidates
    const { candidates } = data;
    for (const candidate of candidates) {
      const new_candidate = await Candidate.create({
        electionID: new_election._id,
        address: candidate.address,
      });

      new_election.candidates.push(new_candidate._id);
    }

    await new_election.save();

    return res.status(201).json({
      status: "success",
      message: "Election created successfully!",
      data: { electionId: new_election._id },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "An error occured while creating the election data",
    });
  }
});

app.get("/elections", async (req, res) => {
  const elections = await Election.find().populate("candidates");

  return res.status(200).json({
    status: "success",
    message: "All elections returned successfully",
    data: elections,
  });
});

app.get("/results/:id", async (req, res) => {
  const election = await Election.findOne({ _id: req.params.id }).populate(
    "candidates"
  );
  if (election) {
    const results = {};
    for (const candidate of election.candidates) {
      // variable to hold the amount of choice sent to the address
      let amount = 0;

      // get the txn history of the addresss
      const txnHistory = await indexerClient
        .searchForTransactions()
        .address(candidate.address)
        .assetID(ASSET_ID)
        .addressRole("receiver")
        .txType("axfer")
        .do();
      const txns = await txnHistory["transactions"];

      // loop through and update the amount
      txns?.forEach((txn) => {
        const transaction = txn["asset-transfer-transaction"];
        amount += transaction["amount"];
      });

      results[candidate.address] = amount / 100;
    }

    return res.status(200).json({
      status: "success",
      message: "Result for election returned successfully!",
      data: results,
    });
  } else {
    return res.status(200).json({
      status: "success",
      message: "Result for election returned successfully!",
      data: [],
    });
  }
});

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
