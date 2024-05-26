

const UserModel = require("../../models/Users");
const RoleModel = require("../../models/Roles");
// const redisHelper = require('../../helpers/redis');

const verifyOtp = (req, res) => {
    const { otp, mobile_number } = req.body;

    UserModel.findOne({ mobile_number: mobile_number })
        .then((user) => {
            if (!user) {
                return res.status(400).json({ message: 'Mobile Number does not exist.', status: 400 });
            }

            let otpData = user.otp;
            const currentDateTime = new Date();
            const expiry_time = new Date(otpData.expiry_time);

            if (otp == otpData.token && currentDateTime.getTime() <= expiry_time.getTime()) {
                // Extract role ID and name from user
                const role = user.roles[0];
                // Fetch role details
                RoleModel.findById(role._id)
                    .then(roleDetails => {
                        let data = {
                            mobile_number: user.mobile_number,
                            role_id: role._id,
                            role_name: roleDetails.name,
                            user_id: user._id,
                            message: 'OTP verified successfully.',
                            status: 200
                        };
                        return res.status(200).json( data);
                    })
                    .catch(err => {
                        return res.status(400).json({ message: 'Internal server error.', status: 400 });
                    });
            } else {
                return res.status(400).json({ message: 'Invalid OTP', status: 400 });
            }
        })
        .catch((error) => {
            console.error("Error finding user:", error);
            return res.status(400).json({ message: 'Internal server error.', status: 400 });
        });
};

module.exports = verifyOtp;
 