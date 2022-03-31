const mongoose = require("mongoose");
const { v4: uuid4 } = require("uuid");

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then((message) => console.log(`Mongoose running successfully!`))
  .catch((error) => console.log(`An error occured!`));

const { Schema } = mongoose;

// Candidate
const CandidateSchema = new Schema({
  electionID: { type: String, ref: "Election" },
  address: { type: String, maxlength: 58 },
});
const Candidate = mongoose.model("Candidate", CandidateSchema);

// Election
const ElectionSchema = new Schema({
  _id: { type: String, default: uuid4 },
  candidates: [{ type: Schema.Types.ObjectId, ref: "Candidate" }],
});
const Election = mongoose.model("Election", ElectionSchema);

module.exports = { Election, Candidate };
