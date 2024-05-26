const userModel = require("../models/UserModel");
//For Register Page
const dashboardView = (req, res) => {
  
   console.log(req.userModel);
   
  res.render("dashboard", {
    userModel: req.userModel
  });
};

module.exports = {
  dashboardView,
};
