const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const manageStatusSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    status_id:  Number, 
    name: String,
    // date: String
});

// module.exports = 
const StatusModel = mongoose.model('Status', manageStatusSchema);

module.exports = StatusModel;

 


 
