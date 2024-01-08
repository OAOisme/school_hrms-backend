const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assessmentResultSchema = new Schema({
    assessment: {
        type: Schema.Types.ObjectId,
        ref: 'Assessment',
        required: true
    },
    employee: {
        type: Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    answers: [
        {
            question: {
                type: String,
                required: true
            },
            answer: {
                type: Number,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('AssessmentResult', assessmentResultSchema);