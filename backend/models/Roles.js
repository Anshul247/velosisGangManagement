const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name: String,
    permissions: {
        canGenerateReport: Boolean,
        canAssignUsers: Boolean,
        canCreateRoles: Boolean
    }
});

module.exports = mongoose.model('Roles', roleSchema);
