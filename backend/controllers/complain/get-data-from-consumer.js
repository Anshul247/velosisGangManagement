

const GetConsumerData = require("../../models/GetConsumerData");
const ComplaintAgency = require("../../models/ComplaintAgency");
 

 

const getDataFromConsumer = async (req, res) => {

   const authHeader = req.headers['authorization'];
   if (!authHeader || !authHeader.startsWith('Basic ')) {
       return res.status(401).json({ message: 'Missing or invalid authorization header', status: 401 });
   }
 
   // Decode the Basic Auth credentials
   const base64Credentials = authHeader.split(' ')[1];  
   const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
   const [username, password] = credentials.split(':');
   if (!username || !password) {
       return res.status(400).json({ message: 'Username and password are required',status: 400 });
   }

//    console.log("username getDataFromConsumer req headers username",username );
//    console.log("password getDataFromConsumer password",password);


   const storedConsumer = await ComplaintAgency.findOne({ username:username });
           console.log("storedConsumer",storedConsumer);

   if (!storedConsumer) {
       return res.status(404).json({ message: 'Consumer not found', status: 404 });
   }


    if(password != storedConsumer.password){
        return res.status(401).json({ message: 'Invalid credentials',status: 401 });
    }
//    // Compare the hashed password
//    const passwordMatch = await bcrypt.compare(password, storedConsumer.password);

//    if (!passwordMatch) {
//        return res.status(401).json({ error: 'Invalid credentials' });
//    }

const  AGENCY_SOURCE =   storedConsumer._id

    const {
        DISCOM,
        ZONE,
        CIRCLE,
        DIVISION,
        SUBDIVISION,
        SUBSTATION,
        FEEDER,
        DISTRICT,
        REGISTRATION_DATE,
        COMPLAINT_TYPE,
        COMPLAINT_SUB_TYPE,
        COMPLAINT_NO,
        CONSUMER_NAME,
        CONSUMER_MOBILE,
        CONSUMER_ADDRESS,
        CONSUMER_TYPE,
        CONSUMER_ACCOUNT_NO,
        REMARKS,
        JE_NAME,
        JE_MOBILE,
        SDO_NAME,
        SDO_MOBILE,
        XEN_NAME,
        XEN_MOBILE,
        STS,
        COMPLAINT_SOURCE,
        // AGENCY_SOURCE
    } = req.body;

    const consumerRequest = new GetConsumerData({
        DISCOM,
        ZONE,
        CIRCLE,
        DIVISION,
        SUBDIVISION,
        SUBSTATION,
        FEEDER,
        DISTRICT,
        REGISTRATION_DATE,
        COMPLAINT_TYPE,
        COMPLAINT_SUB_TYPE,
        COMPLAINT_NO,
        CONSUMER_NAME,
        CONSUMER_MOBILE,
        CONSUMER_ADDRESS,
        CONSUMER_TYPE,
        CONSUMER_ACCOUNT_NO,
        REMARKS,
        JE_NAME,
        JE_MOBILE,
        SDO_NAME,
        SDO_MOBILE,
        XEN_NAME,
        XEN_MOBILE,
        STS,
        COMPLAINT_SOURCE,
        AGENCY_SOURCE
    });


    const complaintNoExists = await GetConsumerData.findOne({ COMPLAINT_NO:COMPLAINT_NO });

    if (complaintNoExists) {
        return res.status(409).json({ message: 'Complaint already exists', status: 409 });
    }
    consumerRequest.save()
        .then(async result => {
            res.status(200).json({
                message: "Data Added Successfully",
                complaintNumber: result.COMPLAINT_NO,
                status: 200
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err.message,
                message: "Error In Saving Data to Database",
                status: 500
            });
        });
};

module.exports = getDataFromConsumer;

