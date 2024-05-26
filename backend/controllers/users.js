const Users = require("../models/Users");

 

const usersController = (req, res) => {

   
    
    const { username, email, password,mobileNumber,addresses,status, confirm } = req.body;
  
 
  
    
    // Users.findOne({ email: email }).then((res) => {
  Users.findOne({ $or: [{ email: email }, { mobile_number: mobileNumber }] }).then((data) => {

      if (data) {
         return res.status(400).json({ error: 'User with this email or mobile number already exists' });
      } else {
         const newUser = new Users({
        //   name,
        //   email,
        //   password,
        username, email, password,mobileNumber,addresses,status
        });
        //Password Hashing
        bcrypt.genSalt(10, (err, salt) => {
         
  
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              console.error('Error hashing password:', err);
              return res.status(500).send('Error hashing password');
            }
  
            newUser.password = hash;
            newUser
              .save()
              .then((savedUser) => {
                // User successfully saved to the database
                return res.status(201).json({ message: 'User registered successfully', user: savedUser });
              })
              .catch((err) => {
                console.error('Error saving user:', err);
                return res.status(500).send('Error saving user');
              });
          });
        });
      }
    });
  };

  module.exports = usersController;