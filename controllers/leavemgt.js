const leaveModel = require('../models/leaverequest');
const audit = require('../middleware/audit');
const employeeModel = require('../models/employee');
const schoolModel = require('../models/school');

module.exports.get_all_leaves = async (req, res, next) => {
    const leaves = await leaveModel.find({ school: req.school._id })
    audit('Get all leaves', 'Leave', req.school._id);
    res.status(200).json({
        leaves: leaves
    });
}

module.exports.getUnapprovedLeaves = async (req, res, next) => {
    const leaves = await leaveModel.find({ school: req.school._id, status: 'Pending' })
    audit('Get unapproved leaves', 'Leave', req.school._id);
    res.status(200).json({
        leaves: leaves
    });
}

module.exports.approveLeave = async (req, res, next) => {
    await leaveModel.updateOne({ _id: req.params.id }, { status: 'Approved' })
    audit('Approve leave', 'Leave', req.school._id);
    res.status(200).json({
        message: 'Leave approved'
    });
};

module.exports.rejectLeave = async (req, res, next) => {
    await leaveModel.updateOne({ _id: req.params.id }, { status: 'Rejected' })
    audit('Reject leave', 'Leave', req.school._id);
    res.status(200).json({
        message: 'Leave rejected'
    });
};

module.exports.getOneLeaveS = async (req, res, next) => {
    const leave = await leaveModel.findOne({ _id: req.params.id })

    audit('Get leave', 'Leave', req.school._id);
    res.status(200).json({
        leave: leave
    });
}


//EMPLOYEE REQUESTS
module.exports.getEmployeeLeaves = async (req, res, next) => {
    const leaves = await leaveModel.find({ employee: req.employee._id })
    audit('Get employee leaves', 'Leave', req.school._id);
    res.status(200).json({
        leaves: leaves
    });
}

module.exports.getOneLeave = async (req, res, next) => {
    const leave = await leaveModel.findOne({ _id: req.params.id })
    audit('Get leave', 'Leave', req.employee.school);
    res.status(200).json({
        leave: leave
    });
}

module.exports.create_leave = async (req, res, next) => {
    const leave = new leaveModel({
        school: req.employee.school,
        employee: req.employee._id,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        reason: req.body.reason,
        status: 'Pending'
    });
    await leave.save();
    audit('Create leave', 'Leave', req.school._id);
    res.status(201).json({
        message: 'Leave created',
        leave: leave
    });
}