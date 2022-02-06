const algosdk = require("algosdk");

require("dotenv").config();

const algodToken = { "X-API-Key": process.env.ALGOD_TOKEN };
const indexerServer = process.env.INDEXER_SERVER;
const algodServer = process.env.ALGOD_SERVER;
const algodPort = process.env.ALGOD_PORT;
const ASSET_ID = parseInt(process.env.ASSET_ID);

const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
const indexerClient = new algosdk.Indexer(algodToken, indexerServer, algodPort);

module.exports = { algodClient, indexerClient, ASSET_ID };
