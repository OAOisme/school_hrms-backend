const express = require('express');
const router = express.Router();
const { checkuser } = require('../middleware/authentication')

const Authentication = require('../controllers/authentication');
const Paysilp = require('../controllers/payslip');
const Leave = require('../controllers/leavemgt');
const { catchError } = require('../middleware/errors');
const { getSelf } = require('../controllers/employee_mgt');


//AUTHENTICATION ROUTES
router.route('/login')
    .post(catchError(Authentication.login_employee));

router.route('/self')
    .post(checkuser, catchError(getSelf));


//PAYSLIP ROUTES
router.route('/payslip')
    .get(checkuser, catchError(Paysilp.getEmployeePayslips));

router.route('/payslip/:id')
    .get(checkuser, catchError(Paysilp.getEmployeePayslip));

//LEAVE ROUTES
router.route('/leave')
    .get(checkuser, catchError(Leave.getEmployeeLeaves))
    .post(checkuser, catchError(Leave.create_leave));

router.route('/leave/:id')
    .get(checkuser, catchError(Leave.getOneLeave))





module.exports = router;