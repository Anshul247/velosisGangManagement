// const login = require('./login');
const getOtp = require('./get-otp');
const verifyOtp = require('./verify-otp');
const getAllUsers = require('./get-all-users');
 

// router.post('/get-all-users', entranceController.getAllUsers);


module.exports = {
    // login,
    getOtp,
    verifyOtp,
    getAllUsers
 };
