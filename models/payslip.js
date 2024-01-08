const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const payslipSchema = new Schema({
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    fullDate: {
        type: Date,
        required: true
    },
    components: [
        {
            name: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            }
        }
    ],
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true
    }
});

module.exports = mongoose.model('Payslip', payslipSchema);