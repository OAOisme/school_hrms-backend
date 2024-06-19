const schoolModel = require('../models/school');
const employeeModel = require('../models/employee');
const audit = require('../middleware/audit');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.signup_school = async (req, res) => {
    if (!(req.body.password && req.body.name && req.body.address && req.body.email)) {
        res.status(400).json({
            message: 'Bad request'
        });
        return;
    }
    const password = bcrypt.hashSync(req.body.password, 10);
    const school = new schoolModel({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        password: password
    });
    const result = await school.save()
    audit('School signup', 'School', result._id);
    res.status(201).json({
        message: 'School created',
        school: result
    });
};

module.exports.login_school = async (req, res) => {
    const school = await schoolModel.findOne({ email: req.body.email })
    if (school) {
        if (bcrypt.compareSync(req.body.password, school.password)) {
            const token = jwt.sign({
                email: school.email,
                _id: school._id
            }, process.env.JWT_SECRET, {
                expiresIn: '10h'
            });
            audit('School login', 'School', school._id);
            res.cookie('token', token, { httpOnly: true });
            console.log("Authentication Successful \t Username: " + school.email)
            res.status(200).json({
                message: 'Authentication successful',
                token: token
            });
        } else {
            audit('School login failed', 'School', audit._id);
            res.status(401).json({
                message: 'Authentication failed'
            });
        }
    } else {
        res.status(401).json({
            message: 'Authentication failed'
        });
    }
};

module.exports.login_employee = async (req, res) => {
    const employee = await employeeModel.findOne({ staffid: req.body.staffID })
    if (employee) {
        if (bcrypt.compareSync(req.body.password, employee.password)) {
            const token = jwt.sign({
                staffid: employee.staffid,
                _id: employee._id
            }, process.env.JWT_SECRET, {
                expiresIn: '10h'
            });
            audit('Employee login', 'Employee', employee._id);
            console.log("Authentication Successful \t Username: " + employee.staffid + "\tName: \t" + employee.name)
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({
                message: 'Authentication successful',
                token: token
            });
        } else {
            audit('Employee login failed', 'Employee', employee._id);
            res.status(401).json({
                message: 'Authentication failed'
            });
        }
    } else {
        res.status(401).json({
            message: 'Authentication failed'
        });
    }
};