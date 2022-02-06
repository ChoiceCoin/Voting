const Proposal = require('./model.js');

const handleCreateProposal = (req, res) => {
    // Validate request
    if(!req.body) {
       return res.status(400).json({
           message: "all fields can not be empty"
       });
   }
   // Create data
   const proposal = new Proposal({
       title: req.body.title, 
   });
   // Save data in the database
   proposal.save()
   .then(data => {
       res.status(200).json({
           message: 'proposal successfully added',
           data: data
       });
    })
    .catch(err => {
       res.status(500).json({
           message: err.message || "Some error occurred while creating proposal."
       });
   });
   };
   
   
   // Retrieve and return data from the database.
   const handleGetAllProposals = (req, res) => {
       Proposal.find()
       .then(data => {
         res.status(200).json({
               message: 'successfully gotten proposals',
               data: data
           });
       }).catch(err => {
           res.status(500).json({
               message: err.message || "Some error occurred while retrieving all proposal datas."
           });
       });
   };
   
   module.exports= ({
       handleCreateProposal,
       handleGetAllProposals
   })