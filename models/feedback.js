const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);