const auditModel = require('../models/audit');

module.exports.getAudit = async (req, res, next) => {
    let audit = await auditModel.find({ school: req.school._id });
    res.status(200).json({
        audit: audit
    });
}
