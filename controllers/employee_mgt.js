const employeeModel = require('../models/employee');
const audit = require('../middleware/audit');
const bcrypt = require('bcrypt');

module.exports.get_all_employees = async (req, res, next) => {
    const employees = await employeeModel.find({ school: req.school._id })
    audit('Get all employees', 'Employee', req.school._id);
    res.status(200).json({
        employees: employees
    });
}

module.exports.get_employee = async (req, res, next) => {
    const employee = await employeeModel.findOne({ _id: req.params.id }).populate(['roles', 'payslipComponent']);
    audit(`Get Employee ${employee.staffid} ${employee.name}`, 'Employee', req.school._id);
    res.status(200).json({
        employee: employee
    });

}

module.exports.create_employee = async (req, res, next) => {

    const passcode = bcrypt.hashSync(req.body.password, 10);

    const employee = new employeeModel({
        staffid: req.body.staffid,
        name: req.body.name,
        roles: req.body.roles,
        school: req.school._id,
        password: passcode,
        payslipComponent: req.body.payslipComponent,
        email: req.body.email
    });
    await employee.save()
    audit('Create employee', 'Employee', req.school._id);
    res.status(201).json({
        message: 'Employee created successfully',
        employee: employee
    });
}

module.exports.update_employee = async (req, res, next) => {
    const employee = await employeeModel.findOne({ _id: req.params.id })
    audit('Update employee', 'Employee', req.school._id);
    employee.staffid = req.body.staffid;
    employee.name = req.body.name;
    employee.roles = req.body.roles;
    await employee.save()
    res.status(200).json({
        message: 'Employee updated successfully',
        employee: employee
    });

}

module.exports.delete_employee = async (req, res, next) => {
    await employeeModel.deleteOne({ _id: req.params.id })
    audit('Delete employee', 'Employee', req.school._id);
    res.status(200).json({
        message: 'Employee deleted successfully'
    });

}