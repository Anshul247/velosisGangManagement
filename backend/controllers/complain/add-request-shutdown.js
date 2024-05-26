

const ShutDownModel = require("../../models/ShutDown");
const ComplainModel = require("../../models/Complain");
const StatusModel = require("../../models/Status");

// const addRequestShutdown = (req, res) => {
//     const {
//         complain_no,
//         statusId,
//         site_pic,
//         current_sit_pic,
//         equipment_pic,
//         latitude,
//         longitude,
//         staff_remark,
//         remark,
//         start_time,
//         end_time,
//         shutdown_status,
//     } = req.body;

//     const shutdownRequest = new ShutDownModel({
//         complain_no,
//         statusId,
//         site_pic,
//         current_sit_pic,
//         equipment_pic,
//         latitude,
//         longitude,
//         staff_remark,
//         remark,
//         start_time,
//         end_time,
//         shutdown_status,
//     });

//     shutdownRequest.save()
//         .then(async result => {
//             const allStatus = await StatusModel.find();
//             let foundStatus = allStatus.find(status => status.status_id == statusId);
//             let statusIdFound = foundStatus?._id;


//             ComplainModel.findOneAndUpdate(
//                 { complain_no: complain_no },
//                 { $set: { status: statusIdFound } }
//             ).catch((error) => {
//                 return res.status(500).json({ message: 'Complaint No is invalid.' });
//             });

//             res.status(200).json({
//                 message: "Shutdown request added successfully",
//                 shutdownRequest: result,
//                 status: 200
//             });
//         })
//         .catch(err => {
//             console.error("Error saving shutdown request:", err);
//             res.status(500).json({
//                 error: err.message
//             });
//         });
// };

const addRequestShutdown = async (req, res) => {
    const {
        complain_no,
        statusId,
        site_pic,
        current_sit_pic,
        equipment_pic,
        latitude,
        longitude,
        staff_remark,
        remark,
        start_time,
        end_time,
        shutdown_status,
    } = req.body;

    const shutdownRequest = new ShutDownModel({
        complain_no,
        statusId,
        site_pic,
        current_sit_pic,
        equipment_pic,
        latitude,
        longitude,
        staff_remark,
        remark,
        start_time,
        end_time,
        shutdown_status,
    });

    try {
        const result = await shutdownRequest.save();

        const allStatus = await StatusModel.find();
        const foundStatus = allStatus.find(status => status.status_id == statusId);
        if (!foundStatus) {
            return res.status(400).json({ message: 'Invalid status ID' });
        }

        const statusIdFound = foundStatus._id;

        const complainUpdateResult = await ComplainModel.findOneAndUpdate(
            { complain_no: complain_no },
            { $set: { status: statusIdFound } }
        );

        if (!complainUpdateResult) {
            return res.status(400).json({ message: 'Complaint No is invalid.',status:400 });
        }

        res.status(200).json({
            message: "Shutdown request added successfully",
            shutdownRequest: result,
            status: 200
        });
    } catch (err) {
        console.error("Error saving shutdown request or updating complaint:", err);
        res.status(500).json(           
        {error: err.message, message: 'Error while adding data in DB.',status:400 }
    );
    }
};


module.exports = addRequestShutdown;

