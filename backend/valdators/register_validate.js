const {body} = require('express-validator');
const UserModel = require('../models/UserModel');

const registerValidator = [
  body('name', 'Please enter your name').not().isEmpty(),
  body('email', 'Please enter your email').not().isEmpty(),
  body('email', 'Please enter valid email').isEmail()
    .custom((value) => {
      return UserModel.findOne({email : value}).then((user) => {
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      });
    }),
  body('password', 'Please enter valid password').not().isEmpty(),
  body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
];

const loginValidator = [
  body('email', 'Please enter your email').not().isEmpty(),
  body('password', 'Please enter valid password').not().isEmpty(),
  body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
];

const chnagePasswordValidator = [
  body('old_password', 'Please enter old password').not().isEmpty(),
  body('new_password', 'Please enter old password').not().isEmpty(),
];

module.exports = {registerValidator,loginValidator,chnagePasswordValidator}
