const roleModel = require('../models/role');
const audit = require('../middleware/audit');

module.exports.get_all_roles = async (req, res, next) => {
    const roles = await roleModel.find({ school: req.school._id })
    audit('Get all roles', 'Role', req.school._id);
    res.status(200).json({
        roles: roles
    });

}

module.exports.get_role = async (req, res, next) => {
    const role = await roleModel.findOne({ _id: req.params.id })
    audit('Get role', 'Role', req.school._id);
    res.status(200).json({
        role: role
    });
}

module.exports.create_role = async (req, res, next) => {
    const role = new roleModel({
        name: req.body.name,
        school: req.school._id,
        permissions: req.body.permissions
    });
    await role.save()

    audit('Create role', 'Role', req.school._id);
    res.status(201).json({
        message: 'Role created successfully',
        role: role
    });
}

module.exports.update_role = async (req, res, next) => {
    const role = await roleModel.findOne({ _id: req.params.id })
    audit('Update role', 'Role', req.school._id)
    role.name = req.body.name;
    role.permissions = req.body.permissions;
    const result = await role.save()
    res.status(200).json({
        message: 'Role updated successfully',
        role: result
    });
}

module.exports.get_all_permissions = async (req, res, next) => {
    res.status(200).json({
        role_check: "Check role/roles permissions",
        role_change: "Change role/roles permissions",
        employee_check: "Check employee/employees permissions",
        employee_change: "Change employee/employees permissions",
        audit: "Check audit permissions",
        payslip_check: "Check payslip/payslips permissions",
        payslip_change: "Change payslip/payslips permissions",
        payslip_generate: "Generate payslip/payslips permissions",
        leave_check: "Check leave/leaves permissions",
        leave_change: "Change leave/leaves permissions",
        assessment_check: "Check assessment/assessments permissions",
        assessment_change: "Change assessment/assessments permissions",
        recruitment_check: "Check recruitment/recruitments permissions",
        recruitment_change: "Change recruitment/recruitments permissions",
        feedback_check: "Check feedback/feedbacks permissions",
        feedback_change: "Change feedback/feedbacks permissions"
    });
}