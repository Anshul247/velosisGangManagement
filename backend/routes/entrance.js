const express = require('express');
const router = express.Router();
const entranceController = require('../controllers/entrance/index');









router.post('/get-otp', entranceController.getOtp);
router.post('/get-all-users', entranceController.getAllUsers);
router.post('/verify-otp', entranceController.verifyOtp);


module.exports = router;
