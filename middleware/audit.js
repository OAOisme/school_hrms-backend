const auditModel = require('../models/audit');

module.exports = (description, category, school) => {
    const audit = new auditModel({
        description: description,
        timestamp: new Date(),
        category: category,
        school: school
    });
    audit.save();
}