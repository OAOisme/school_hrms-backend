const payslip = require('../models/payslip');
const audit = require('../middleware/audit');
const employeeModel = require('../models/employee');
const payslipComponent = require('../models/payslipComponent');

module.exports.get_all_payslips = async (req, res, next) => {
    const payslips = await payslip.find({ school: req.school._id })
    audit('Get all payslips', 'Payslip', req.school._id);
    res.status(200).json({
        payslips: payslips
    });

}

module.exports.filter_by_monthandyear = async (req, res, next) => {
    const month = req.body.month;
    const year = req.body.year;
    const payslips = await payslip.find({ school: req.school._id, fullDate: { $gte: new Date(year, month - 1, 1), $lt: new Date(year, month, 1) } })
    audit('Filter payslips', 'Payslip', req.school._id);
    res.status(200).json({
        payslips: payslips
    });
}

module.exports.get_payslip = async (req, res, next) => {
    const p = await payslip.findOne({ _id: req.params.id })
    audit('Get payslip', 'Payslip', req.school._id);
    res.status(200).json({
        payslip: p
    });

}

module.exports.create_payslip = async (req, res, next) => {
    const payslip = new payslipComponent({
        school: req.school._id,
        component: req.body.component,
        name: req.body.name
    });
    await payslip.save();

    res.status(201).json({
        message: 'Payslip created successfully',
        payslip: payslip
    });

}

module.exports.update_payslip = async (req, res, next) => {
    const payslip = await payslipComponent.findOne({ _id: req.params.id });
    payslip.component = req.body.component;
    payslip.name = req.body.name;
    await payslip.save();

    res.status(200).json({
        message: 'Payslip updated successfully',
        payslip: payslip
    });
}

module.exports.assignSlip = async (req, res, next) => {
    const employees = req.body.employees;
    const payComponent = req.params.id;

    const result = await employeeModel.updateMany({ _id: { $in: employees } }, { payslipComponent: payComponent })
    audit('Assign payslip', 'Payslip', req.school._id);
    res.status(200).json({
        message: 'Payslip assigned successfully',
        result: result
    });
}

module.exports.generatePayslip = async (req, res, next) => {
    let employees = req.body.employees;

    employees = await employeeModel.find({ _id: { $in: employees } }).populate('payslipComponent')
    for (let employee of employees) {
        let pay = new payslip({
            employee: employee._id,
            school: req.school._id,
            components: employee.payslipComponent.component,
            fullDate: new Date()
        });
        await pay.save();
    }
    audit('Generate payslip', 'Payslip', req.school._id);
    res.status(200).json({
        message: 'Payslip generated successfully'
    });
}

module.exports.getPayslipComponents = async (req, res, next) => {
    const components = await payslipComponent.find({ school: req.school._id });
    res.status(200).json({
        components: components
    });
}

//EMPLOYEE

module.exports.getEmployeePayslips = async (req, res, next) => {
    const employee = req.employee._id;
    const payslips = payslip.find({ employee: employee })
    audit('Get employee payslips', 'Payslip', req.school._id);
    res.status(200).json({
        payslips: payslips
    });
}

module.exports.getEmployeePayslip = async (req, res, next) => {
    const employee = req.employee._id;
    const p = await payslip.findOne({ employee: employee, _id: req.params.id })
    audit('Get employee payslip', 'Payslip', req.school._id);
    res.status(200).json({
        payslip: p
    });
}