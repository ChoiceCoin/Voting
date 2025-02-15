const mongoose = require("mongoose");

const Transaction = mongoose.model('Transaction', new mongoose.Schema({
    address: {
        type: String,
        trim: true,
        required: true
    },
    receiverAddress : {
        type: String,
        trim: true,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    assetID: {
        type: Number,
        required: true
    },
    txnID: {
        type: String,
        required: true,
        trim: true
    },
    transactionType: {
        type: String,
        enum: ['withdraw', 'vote']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}));

module.exports = { Transaction }