const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gangMemberSchema = new Schema({
    name: String,
    aadhaarID: String,
    EPSCICNumber: String,
    ITICertificateNumber: String
});

const securityEquipmentSchema = new Schema({
    item: String,
    qty: Number
});

const gangSchema = new Schema({
    gang_id: String,
    location: String,
    leader: String,
    nearest_substation: String,
    ContactNumber: String,
    security_equipments: [securityEquipmentSchema],
    tools_available: String,
    gangmember: [gangMemberSchema],
    site_pic: String,
    equipment_pic: String,
    critical_issue: String
});

module.exports = mongoose.model('gang_details', gangSchema);
 