const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assessmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    assessmentroles: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Role',
            required: true
        }
    ],
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    questions: [{
        question: {
            type: String,
            required: true
        },
        optionStart: {
            type: Number,
            required: true
        },
        optionEnd: {
            type: Number,
            required: true
        },
        _id: false
    }],
});

module.exports = mongoose.model('Assessment', assessmentSchema);