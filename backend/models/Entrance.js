
const mongoose = require("mongoose");

const EntranceSchema = new mongoose.Schema({
  // username: {
  //   type: String,
  //   required: true,
  // },

  // email: {
  //   type: String,
  //   required: true,
  //   unique: true,
  // },
  mobile_number:{
    type: Number,
    required: true,
    unique: true, 
  },
  otp: {
    type: String,
    required: true,
  },  
 
});

const Entrance = mongoose.model("Entrance", EntranceSchema);
module.exports = Entrance;
 
