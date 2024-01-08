const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const auditSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    school: {
        type: Schema.Types.ObjectId,
        ref: 'School',
        required: true
    }
});

module.exports = mongoose.model('Audit', auditSchema);