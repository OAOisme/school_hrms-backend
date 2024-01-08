const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const leaveRequestSchema = new Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true
    }
});

module.exports = mongoose.model('LeaveRequest', leaveRequestSchema);