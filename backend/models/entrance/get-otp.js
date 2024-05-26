
const mongoose = require("mongoose");

const EntranceSchema = new mongoose.Schema({
 
  mobile_number:{
    type: Number,
    required: true,
    unique: true, 
  }
  
 
});

const Entrance = mongoose.model("Entrance", EntranceSchema);
module.exports = Entrance;
 
