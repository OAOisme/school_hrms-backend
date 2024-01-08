const express = require('express');
const router = express.Router();
const { checkuser } = require('../middleware/authentication')

const Authentication = require('../controllers/authentication');
const Paysilp = require('../controllers/payslip');
const Leave = require('../controllers/leavemgt');
const { catchError } = require('../middleware/errors');

//AUTHENTICATION ROUTES
router.route('/login')
    .post(catchError(Authentication.login_employee));


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