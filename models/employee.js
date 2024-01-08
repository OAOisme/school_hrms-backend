const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    staffid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    roles: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    password: {
        type: String,
        required: true
    },
    payslipComponent: {
        type: Schema.Types.ObjectId,
        ref: 'PayslipComponent',
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
});

module.exports = mongoose.model('Employee', employeeSchema);