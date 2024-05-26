const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GangMemberSchema = new Schema({
    name: { type: String, required: false },
    aadhaarid: { type: String, required: false },
    epsci_number: { type: String, required: false },
    iti_certificate_number: { type: String, required: false }
});

const SecurityEquipmentSchema = new Schema({
    item: { type: String, required: false },
    qty: { type: String, required: false },
});

const shutDownSchema = new Schema({
    complain_no: { type: String, required: true },
    leader: { type: String, required: false },
    nearest_substation: { type: String, required: false },
    security_equipments: { type: [SecurityEquipmentSchema], required: false },
    tools_available: { type: String, required: false },
    site_pic: { type: String, required: false },
    current_sit_pic: { type: String, required: false },
    equipment_pic: { type: String, required: false },
    critical_issue: { type: String, required: false },
    latitude: { type: String, required: false },
    longitude: { type: String, required: false },
    staff_remark: { type: String, required: false },
    remark: { type: String, required: false },
    start_time: { type: String, required: false },
    end_time: { type: String, required: false },
    gang_id: { type: String, required: false },
    shutdown_status: { type: String, required: false },
    gang_member: { type: [GangMemberSchema], required: false },
    contact_number: { type: String, required: false },

});

const ShutDownModel = mongoose.model('gang_details', shutDownSchema);

module.exports = ShutDownModel;


 


 
