const jwt = require('jsonwebtoken');
const employeeModel = require('../models/employee');
const schoolModel = require('../models/school');

function isSubset(array, subset) {
    return subset.every(element => array.includes(element));
}

module.exports.checkuser = async (req, res, next) => {
    try {

        const token = req.headers && req.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        employeeModel.findOne({ _id: decoded._id }).populate('roles')
            .then(employee => {
                if (employee) {
                    req.employee = employee;

                    next();
                } else {
                    res.status(401).json({
                        message: 'Authentication failed'
                    });
                }
            })
    } catch (error) {
        res.status(500).json({
            message: error
        });
    }
}

module.exports.checkadmin = async (req, res, next) => {
    try {
        const token = req.headers && req.headers.authorization.split(' ')[1];
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        schoolModel.findOne({ _id: decoded._id })
            .then(school => {
                if (school) {
                    req.school = school;
                    next();
                } else {
                    res.status(401).json({
                        message: 'Authentication failed'
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    } catch (error) {
        res.status(401).json({
            message: error
        });
    }
}

module.exports.getadmin = async (req, res, next) => {
    try {
        const token = req.headers && req.headers.authorization.split(' ')[1];
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        schoolModel.findOne({ _id: decoded._id })
            .then(school => {
                if (school) {
                    res.status(200).json({
                        school: school
                    });
                } else {
                    res.status(401).json({
                        message: 'Authentication failed'
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    } catch (error) {
        res.status(401).json({
            message: error
        });
    }

}


module.exports.checkroles = (values) => {
    return function (req, res, next) {
        if (isSubset(req.employee.roles.permissions, values)) {
            schoolModel.findOne({ _id: req.employee.school })
                .then(school => {
                    if (school) {
                        req.school = school;
                        next();
                    } else {
                        res.status(401).json({
                            message: 'Authentication failed'
                        });
                    }
                })

        } else {
            res.status(403).json({
                message: 'Forbidden'
            });
        }
    }
}
