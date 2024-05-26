


const ComplainModel = require("../../models/Complain");
const StatusModel = require("../../models/Status");
const UserModel = require("../../models/Users");
const RoleModel = require("../../models/Roles");

const getComplains = async (req, res) => {
    try {
        const assigned_area_userID = req.body.userID;

        // Fetch user's role from UserModel
        const user = await UserModel.findById(assigned_area_userID);
        if (!user) {
            return res.status(404).json({ message: "User not found", status: 400 });
        }

        // Fetch role details from RoleModel based on user's role
        const roleDetails = await RoleModel.findById(user.roles);
        if (!roleDetails) {
            return res.status(404).json({ message: "Role details not found", status: 400 });
        }

        const data = {
            role_id: roleDetails._id,
            role_name: roleDetails.name,
        };
        const allStatus = await StatusModel.find();
        console.log("allStatus", allStatus);
        const statusIds = [1, 2, 3];

        // Filter the allStatus array based on the status IDs and extract _id fields
        const _ids = allStatus
            .filter(status => statusIds.includes(status.status_id)) // Filter based on status IDs
            .map(status => status._id); // Extract _id fields


        console.log("status1", _ids);
        if (data.role_name === 'SSO') {
            // for SSO
            // const complains = await ComplainModel.find({ assigned_area_userID: assigned_area_userID })
            const complains = await ComplainModel.find({ status: { $in: _ids } })
                .populate('assigned_area_userID', '-password -otp');

            if (!complains || complains.length === 0) {
                return res.status(404).json({ message: "No complaints found", status: 400 });
            }

            const response = []; // Initialize response array

            // Iterate over complains array
            for (const complain of complains) {
                // Find status for each complain
                const status = await StatusModel.findById(complain.status)
                    .catch(error => {
                        console.error("Error finding status:", error);
                        return null;
                    });

                // Build response object with complain details and status
                response.push({
                    SERVICE_ORDER_NO: complain.service_order_no,
                    COMPLAIN_NO: complain.complain_no,
                    AccountId: complain.consumer_account_no,
                    shutdown_request_by: complain.shutdown_request_by,
                    registration_date: complain.registration_date,
                    shutdown_request_date: complain.shutdown_request_date,
                    assigned_area: complain.assigned_area,
                    status: status ? status.name : null, // Set status name if found, otherwise null
                    status_id: status ? status.status_id : null // Set status ID if found, otherwise null
                });
            }

            // After all status queries are complete, calculate total counts and filter complaints
            const finalRes = [];
            // if (data.role_name === 'SSO') {
            finalRes.push(1, 2, 3); // Status IDs allowed for SSO role

            const filteredResponse = response.filter(complain => finalRes.includes(complain.status_id));
            let responseObject = {};


            const totalPending = filteredResponse.filter(complain => complain.status_id === 1).length;
            const totalApproved = filteredResponse.filter(complain => complain.status_id === 2).length;
            const totalRejected = filteredResponse.filter(complain => complain.status_id === 3).length;

            responseObject = {
                totalPending,
                totalApproved,
                totalRejected,
                totalComplain: totalPending + totalApproved + totalRejected, // Calculate total complaints
                complaints: filteredResponse,
                role: data,
                message: 'Details fetched successfully.',
                status: 200
            };

            return res.status(200).json(responseObject);
        } else {


            const statusIds = [4, 5, 6, 7];

            const _ids = allStatus
                .filter(status => statusIds.includes(status.status_id))
                .map(status => status._id);
            // Fetch complaints
            const complains = await ComplainModel.find({ status: { $in: _ids } })

                .populate('assigned_area_userID', '-password -otp');

            if (!complains || complains.length === 0) {
                return res.status(404).json({ message: "No complaints found", status: 400 });
            }

            const response = []; // Initialize response array

            // Iterate over complains array
            for (const complain of complains) {
                // Find status for each complain
                const status = await StatusModel.findById(complain.status)
                    .catch(error => {
                        console.error("Error finding status:", error);
                        return null;
                    });

                // Build response object with complain details and status
                response.push({
                    SERVICE_ORDER_NO: complain.service_order_no,
                    COMPLAIN_NO: complain.complain_no,
                    AccountId: complain.consumer_account_no,
                    shutdown_request_by: complain.shutdown_request_by,
                    registration_date: complain.registration_date,
                    shutdown_request_date: complain.shutdown_request_date,
                    assigned_area: complain.assigned_area,
                    status: status ? status.name : null, // Set status name if found, otherwise null
                    status_id: status ? status.status_id : null // Set status ID if found, otherwise null
                });
            }


            const finalRes = [];

            if (data.role_name === 'GANG') {
                finalRes.push(4, 5, 6, 7);
            }

            // Filter response object based on allowed status IDs
            const filteredResponse = response.filter(complain => finalRes.includes(complain.status_id));
            let responseObject = {};

            if (data.role_name === 'GANG') {
                const totalAssigned = filteredResponse.filter(complain => complain.status_id === 5).length;
                const totalResolved = filteredResponse.filter(complain => complain.status_id === 7).length;
                const totalInProgress = filteredResponse.filter(complain => complain.status_id === 4).length;
                const totalShutdownInitiated = filteredResponse.filter(complain => complain.status_id === 6).length;

                responseObject = {
                    totalAssigned,
                    totalResolved,
                    totalInProgress,
                    totalShutdownInitiated,
                    totalComplain: totalAssigned + totalResolved + totalInProgress + totalShutdownInitiated, // Calculate total complaints
                    complaints: filteredResponse,
                    role: data,
                    message: 'Details fetched successfully.',
                    status: 200
                };
            }

            return res.status(200).json(responseObject);

        }


    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error", status: 500 });
    }
};

module.exports = getComplains;



