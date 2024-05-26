 
const getComplains = require('./get-complains');
const addRequestShutdown = require('./add-request-shutdown');
const updateRequestShutdown = require('./update-request-shutdown');
const getShutdownDetails = require('./get-shutdown-details');
const getDataFromConsumer = require('./get-data-from-consumer');
  

// router.post('/get-data-from-consumer', complainController.getDataFromConsumer);


module.exports = {
    getComplains,
    addRequestShutdown,
    updateRequestShutdown,
    getShutdownDetails,
    getDataFromConsumer
 };
