//const passport = require("passport");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
//For Register Page
const registerView = (req, res) => {
  res.render("register", {});
};

//Post Request for Register

const registerUser = (req, res) => {

  console.log(req.body);
  
  const { name, email, password, confirm } = req.body;

  if (!name || !email || !password || !confirm) {
    console.log("Fill empty fields");
    return res.render("register", { // Render the register page again with existing input
      name,
      email,
      password,
      confirm,
    });
  }

  // Confirm Passwords
  if (password !== confirm) {
    console.log("Password must match");
    return res.render("register", { // Render the register page again with existing input
      name,
      email,
      password,
      confirm,
    });
  }

  //Validation
  User.findOne({ email: email }).then((user) => {
    if (user) {
      console.log("Email already exists");
      return res.render("register", { // Render the register page again with existing input
        name,
        email,
        password,
        confirm,
      });
    } else {
      //Validation
      const newUser = new User({
        name,
        email,
        password,
      });
      //Password Hashing
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.error('Error generating salt:', err);
          return res.status(500).send('Error generating salt');
        }

        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).send('Error hashing password');
          }

          newUser.password = hash;
          newUser
            .save()
            .then(() => res.redirect("/login"))
            .catch((err) => {
              console.error('Error saving user:', err);
              return res.status(500).send('Error saving user');
            });
        });
      });
    }
  });
};

// For View
const loginView = (req, res) => {
  res.render("login", {});
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  //Required
  if (!email || !password) {
    console.log("Please fill in all the fields");
    res.render("login", {
      email,
      password
    });

  } else {
    
    // User.findOne({email:email, password:password}).then((user)=>{
    //   if(user){
    //     res.send('Login');
    //   } else {
    //     res.send('Invalid');
    //   }
    // }).catch(error=>{console.log(error);});

    User.findOne({ email: email })
       .then(async (user) => {
        if (user) {
          // Compare hashed password with entered password
          const match = await bcrypt.compare(password, user.password);

          if(match) {    
            
            res.render('dashboard', { user: user });
            // res.send('Login successful');
            //res.redirect('/dashboard');
            //res.redirect("/dashboard");   
            //res.redirect(307, '/dashboard'); // 307 status code to maintain method       
            
          } else {
            res.send('Invalid credentials');
          }

         } else {
             res.send('User not found');
         }
       }).catch((error) => {
         console.error(error);
         res.status(500).send('Error during login');
       });

      // passport.authenticate("local", {
      // successRedirect: "/dashboard",
      // failureRedirect: "/login",
      // failureFlash: true,
      // })(req, res);      
  }
};

module.exports = {
  registerView,
  loginView,
  registerUser,
  loginUser,
};