const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recruitmentResultSchema = new Schema({
    recruitment: {
        type: Schema.Types.ObjectId,
        ref: 'Recruitment',
        required: true
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true
    },
    answers: [
        {
            question: {
                type: String,
                required: true
            },
            answer: [{
                type: String,
                required: true
            }]
        }
    ]
});

module.exports = mongoose.model('RecruitmentResult', recruitmentResultSchema);