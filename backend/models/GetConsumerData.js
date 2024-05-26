const mongoose = require('mongoose');

const getConsumerData = new mongoose.Schema({
  DISCOM: { type: String, required: false },
  ZONE: { type: String, required: false },
  CIRCLE: { type: String, required: false },
  DIVISION: { type: String, required: false },
  SUBDIVISION: { type: String, required: false },
  SUBSTATION: { type: String, required: false },
  FEEDER: { type: String, required: false },
  DISTRICT: { type: String, required: false },
//   REGISTRATION_DATE: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },
  REGISTRATION_DATE: { type: String, required: false},
  COMPLAINT_TYPE: { type: String, required: false },
  COMPLAINT_SUB_TYPE: { type: String, required: false },
  COMPLAINT_NO: { type: String, required: true },
  CONSUMER_NAME: { type: String, required: false },
  CONSUMER_MOBILE: { type: String, required: false },
  CONSUMER_ADDRESS: { type: String, required: false },
  CONSUMER_TYPE: { type: String, required: false },
  CONSUMER_ACCOUNT_NO: { type: String, required: false },
  REMARKS: { type: String, required: false },
  JE_NAME: { type: String, required: false },
  JE_MOBILE: { type: String, required: false },
  SDO_NAME: { type: String, required: false },
  SDO_MOBILE: { type: String, required: false },
  XEN_NAME: { type: String, required: false },
  XEN_MOBILE: { type: String, required: false },
  STS: { type: String, required: false },
  COMPLAINT_SOURCE: { type: String, required: false },
  AGENCY_SOURCE: { type: String, required: false },
});

module.exports = mongoose.model('Complain', getConsumerData);

