const express = require('express');
const router = express.Router();
const { checkadmin, getadmin } = require('../middleware/authentication')
const { catchError } = require('../middleware/errors');

const Authentication = require('../controllers/authentication');
const Role = require('../controllers/role');
const employeeManagement = require('../controllers/employee_mgt');
const audit = require('../controllers/audit');
const payslip = require('../controllers/payslip');
const leave = require('../controllers/leavemgt');
const assessment = require('../controllers/assessment');
const recruitment = require('../controllers/recruitment');


//AUTHENTICATION ROUTES
router.route('/login')
    .post(catchError(Authentication.login_school))
    .get(checkadmin, catchError(getadmin));

router.route('/signup')
    .post(catchError(Authentication.signup_school));

//ROLE ROUTES
router.route('/roles')
    .get(checkadmin, catchError(Role.get_all_roles))
    .post(checkadmin, catchError(Role.create_role));

router.route('/roles/:id')
    .get(checkadmin, catchError(Role.get_role))
    .put(checkadmin, catchError(Role.update_role));

//EMPLOYEE ROUTES
router.route('/employees')
    .get(checkadmin, catchError(employeeManagement.get_all_employees))
    .post(checkadmin, catchError(employeeManagement.create_employee));

router.route('/employees/:id')
    .get(checkadmin, catchError(employeeManagement.get_employee))
    .put(checkadmin, catchError(employeeManagement.update_employee));

//AUDIT ROUTES
router.route('/audit')
    .get(checkadmin, catchError(audit.getAudit));


//PAYSLIP ROUTES
router.route('/payslips')
    .get(checkadmin, catchError(payslip.get_all_payslips))
    .post(checkadmin, catchError(payslip.create_payslip));

router.route('/payslips/filter')
    .post(checkadmin, catchError(payslip.filter_by_monthandyear));

router.route('/paycomponents')
    .get(checkadmin, catchError(payslip.getPayslipComponents))

router.route('/payslips/:id')
    .get(checkadmin, catchError(payslip.get_payslip))
    .put(checkadmin, catchError(payslip.update_payslip))
    .post(checkadmin, catchError(payslip.assignSlip));

router.route('/generatePaySlip')
    .post(checkadmin, catchError(payslip.generatePayslip));

//LEAVE ROUTES
router.route('/leaves')
    .get(checkadmin, catchError(leave.getUnapprovedLeaves))
    .post(checkadmin, catchError(leave.get_all_leaves));

router.route('/leaves/:id')
    .get(checkadmin, catchError(leave.getOneLeaveS))
    .post(checkadmin, catchError(leave.approveLeave))
    .delete(checkadmin, catchError(leave.rejectLeave));

//ASSESSEMENT ROUTES
router.route('/assessments')
    .get(checkadmin, catchError(assessment.get_all_assessments))
    .post(checkadmin, catchError(assessment.create_assessment));

router.route('/assessments/:id')
    .get(checkadmin, catchError(assessment.get_assessment))
    .put(checkadmin, catchError(assessment.update_assessment));

router.route('/assessments/results/:id')
    .get(checkadmin, catchError(assessment.get_all_results));

//RECRUITMENT ROUTES

router.route('/recruitment')
    .get(checkadmin, catchError(recruitment.get_all_recruitments))
    .post(checkadmin, catchError(recruitment.create_recruitment));

router.route('/recruitment/:id')
    .get(checkadmin, catchError(recruitment.get_recruitment))
    .put(checkadmin, catchError(recruitment.update_recruitment));

router.route('/recruitment/result/:id')
    .get(checkadmin, catchError(recruitment.get_all_results));



module.exports = router;