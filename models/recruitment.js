const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recruitmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    questions: [{
        question: {
            type: String,
            required: true
        },
        inputType: {
            type: String,
            required: true,
            enum: ['text', 'number', 'date', 'radio', 'checkbox']
        },
        options: [{
            option: String,
            value: String
        }],
        _id: false
    }],
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive'],
        default: 'active'
    },
});

module.exports = mongoose.model('Recruitment', recruitmentSchema);