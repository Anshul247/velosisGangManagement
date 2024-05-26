
const UserModel = require("../../models/Users");
 

const getAllUsers = (req, res) => {
    

    try {
        UserModel.find()
        .then((user) => {
 
            return res.status(200).json({user,status: 200 });
           
        })
        .catch((error) => {
            console.error("Error finding user:", error);
            return res.status(400).json({ message: 'Internal server error. ', status: 400 });
        });
    } catch (error) {
        return res.status(500).json({ error: error, status: 500 });
        
    }
   
};

module.exports = getAllUsers;
