const express = require("express");
const router = express.Router();
 

router.get("/", loginView);
router.get("/register", registerView);

 

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;