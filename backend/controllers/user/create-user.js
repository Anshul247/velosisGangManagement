const Users = require("../../models/Users");
const bcrypt = require("bcryptjs");
 
const createUser = (req, res) => {
   
const { username, email, password,mobile_number,addresses,status, confirm } = req.body;
 
  Users.findOne({ $or: [{ email: email }, { mobile_number: mobile_number }] }).then((data) => {

    console.log("data",data);

      if (data) {
         return res.status(400).json({ error: 'User with this email or mobile number already exists' });
      } else {

        const newUser = new Users({        
        username, email, password,mobile_number,addresses,status
        });
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
                 return res.status(200).json({ message: 'User registered successfully', user: savedUser });
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

module.exports = createUser;