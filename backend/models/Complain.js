const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({

// const ComplaintSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  division_uid: {
    type: String,
    required: true
  },
  complain_no: {
    type: String,
    required: true
  },
  service_order_no: {
    type: String,
    required: true
  },
  assigned_area_userID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  complaint_type: String,
  complaint_sub_type: String,
  consumer_name: String,
  consumer_mobile: String,
  consumer_address: String,
  consumer_type: String,
  consumer_account_no: String,
  citizen_charter: String,
  remarks: String,
  staffremarks: String,
  je_name: String,
  je_mobile: String,
  sdo_name: String,
  sdo_mobile: String,
  exen_name: String,
  exen_mobile: String,
//   status: {
//     type: Schema.Types.ObjectId,
//     ref: 'manage_status'
// },
  status: { type: mongoose.Schema.Types.ObjectId },
  initialuser: String,
  initial_iuv_login: String,
  gang_id: {
    type: mongoose.Schema.Types.ObjectId,
    
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
     
  },
  assigned_area: String,
  service_engineer: {
    name: String,
    mobile: String
  },
  shutdown_request_ticket: {
    ticket_number: String,
    approval_status: String
  },
  closingdate: String,
  closedby: String,
  closedpost: String,
  current_escalation: String,
  complaint_source: String,
  registration_date: Date,
  shutdown_request_date: Date,
  shutdown_request_by: String,
  complaint_update: String
});

const ComplaintModel = mongoose.model('complain_details', ComplaintSchema);

module.exports = ComplaintModel;
