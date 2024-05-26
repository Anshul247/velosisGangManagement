const express = require("express");
const router = express.Router();
const usersController  = require("../controllers/user");



 
router.post("/create-user", usersController.createUser)


module.exports = router;