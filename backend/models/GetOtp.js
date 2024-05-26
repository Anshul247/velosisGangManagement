
const mongoose = require("mongoose");

const GetOtpSchema = new mongoose.Schema({
 
  mobile_number:{
    type: Number,
    required: true,
    unique: true, 
  }
  
 
});

const GetOtp = mongoose.model("GetOtp", GetOtpSchema);
module.exports = GetOtp;
 
