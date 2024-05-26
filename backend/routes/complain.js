const express = require('express');
const router = express.Router();
const complainController = require('../controllers/complain/index');










router.post('/get-data-from-consumer', complainController.getDataFromConsumer);
router.post('/get-complains', complainController.getComplains);
router.post('/add-request-shutdown', complainController.addRequestShutdown);
router.post('/get-stutdown-details', complainController.getShutdownDetails);
router.post('/update-request-shutdown', complainController.updateRequestShutdown);




module.exports = router;
