const express = require("express");
const router = express.Router();
const { startVote, endVote } = require("../controller/vote");

router.route('/start').get(startVote).post(startVote);
router.route('/end').get(endVote).post(endVote);

module.exports = router;