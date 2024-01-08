const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const payslipComponentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    component: [
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

module.exports = mongoose.model('PayslipComponent', payslipComponentSchema);