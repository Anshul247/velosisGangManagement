
const UserModel = require("../../models/Users");
// const redisHelper = require('../../helpers/redis');

const generateOTP = () => {
    let otp = Math.floor(Math.random() * 1000000);
    otp = otp.toString().padStart(6, '0');
    return otp;
}

const getOtp = (req, res) => {
    const { mobile_number } = req.body;
    // Find the mobile_number in the database
    UserModel.findOne({ mobile_number: mobile_number })
        .then(async (user) => {

            if (!user) {
                return res.status(400).json({ message: 'Mobile Number does not exist.', status: 400 });
            }
            const otp = generateOTP();
            const dateTime = new Date();
            const expiry_time = new Date(dateTime.getTime() + 5 * 60 * 1000); // Add 5 minutes in milliseconds

            UserModel.findOneAndUpdate(
                { mobile_number: mobile_number },
                { $set: { otp: { token: otp, expiry_time: expiry_time.toISOString() } } }

            ).then((result) => {
                return res.status(200).json({ otp, message: 'Otp has been sent successfully on your mobile no.', status: 200 });
            })
                .catch((error) => {
                    console.error("Error finding user:", error);
                    return res.status(400).json({ message: 'Internal server error. ', status: 400 });
                });
        })
        .catch((error) => {
            console.error("Error finding user:", error);
            return res.status(400).json({ message: 'Internal server error. ', status: 400 });
        });
};

module.exports = getOtp;
