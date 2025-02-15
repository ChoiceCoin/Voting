const mongoose = require('mongoose');

// defining the model schema
const  proposalSchema = mongoose.Schema({
    title : String,
})

module.exports = mongoose.model('proposal', proposalSchema);
