const express = require('express');
const router = express.Router();
const { catchError } = require('../middleware/errors');
const { checkuser, checkroles } = require('../middleware/authentication')

const Authentication = require('../controllers/authentication');
const Role = require('../controllers/role');
const employeeManagement = require('../controllers/employee_mgt');
const audit = require('../controllers/audit');
const payslip = require('../controllers/payslip');
const leave = require('../controllers/leavemgt');
const assessment = require('../controllers/assessment');
const recruitment = require('../controllers/recruitment');
const feedback = require('../controllers/feedback');

//ROLE ROUTES
router.route('/roles')
    .get(checkuser, checkroles(['role_check']), catchError(Role.get_all_roles))
    .post(checkuser, checkroles(['role_change']), catchError(Role.create_role));

router.route('/roles/:id')
    .get(checkuser, checkroles(['role_check']), catchError(Role.get_role))
    .put(checkuser, checkroles(['role_change']), catchError(Role.update_role));

//EMPLOYEE ROUTES
router.route('/employees')
    .get(checkuser, checkroles(['employee_check']), catchError(employeeManagement.get_all_employees))
    .post(checkuser, checkroles(['employee_change']), catchError(employeeManagement.create_employee));

router.route('/employees/:id')
    .get(checkuser, checkroles(['employee_check']), catchError(employeeManagement.get_employee))
    .put(checkuser, checkroles(['employee_change']), catchError(employeeManagement.update_employee));

//AUDIT ROUTES
router.route('/audit')
    .get(checkuser, checkroles(['audit']), catchError(audit.getAudit));


//PAYSLIP ROUTES
router.route('/payslips')
    .get(checkuser, checkroles(['payslip_check']), catchError(payslip.get_all_payslips))
    .post(checkuser, checkroles(['payslip_change']), catchError(payslip.create_payslip));

router.route('/payslips/filter')
    .post(checkuser, checkroles(['payslip_check']), catchError(payslip.filter_by_monthandyear));

router.route('/paycomponents')
    .get(checkuser, checkroles(['payslip_check']), catchError(payslip.getPayslipComponents))

router.route('/payslips/:id')
    .get(checkuser, checkroles(['payslip_check']), catchError(payslip.get_payslip))
    .put(checkuser, checkroles(['payslip_change']), catchError(payslip.update_payslip))
    .post(checkuser, checkroles(['payslip_change']), catchError(payslip.assignSlip));

router.route('/generatePaySlip')
    .post(checkuser, checkroles(['payslip_generate']), catchError(payslip.generatePayslip));

//LEAVE ROUTES
router.route('/leaves')
    .get(checkuser, checkroles(['leave_check']), catchError(leave.getUnapprovedLeaves))
    .post(checkuser, checkroles(['leave_check']), catchError(leave.get_all_leaves));

router.route('/leaves/:id')
    .get(checkuser, checkroles(['leave_check']), catchError(leave.getOneLeaveS))
    .put(checkuser, checkroles(['leave_change']), catchError(leave.approveLeave))
    .delete(checkuser, checkroles(['leave_change']), catchError(leave.rejectLeave));

//ASSESSEMENT ROUTES
router.route('/assessments')
    .get(checkuser, checkroles(['assessment_check']), catchError(assessment.get_all_assessments))
    .post(checkuser, checkroles(['assessment_change']), catchError(assessment.create_assessment));

router.route('/assessments/:id')
    .get(checkuser, checkroles(['assessment_check']), catchError(assessment.get_assessment))
    .put(checkuser, checkroles(['assessment_change']), catchError(assessment.update_assessment));

router.route('/assessments/results/:id')
    .get(checkuser, checkroles(['assessment_check']), catchError(assessment.get_all_results));

//RECRUITMENT ROUTES

router.route('/recruitment')
    .get(checkuser, checkroles(['recruitment_check']), catchError(recruitment.get_all_recruitments))
    .post(checkuser, checkroles(['recruitment_change']), catchError(recruitment.create_recruitment));

router.route('/recruitment/:id')
    .get(checkuser, checkroles(['recruitment_check']), catchError(recruitment.get_recruitment))
    .put(checkuser, checkroles(['recruitment_change']), catchError(recruitment.update_recruitment));

router.route('/recruitment/result/:id')
    .get(checkuser, checkroles(['recruitment_check']), catchError(recruitment.get_all_results));


//FEEDBACK ROUTES
router.route('/feedback')
    .get(checkuser, checkroles(['feedback_check']), catchError(feedback.get_feedback));

router.route('/feedback/:id')
    .get(checkuser, checkroles(['feedback_check']), catchError(feedback.get_one_feedback))
    .delete(checkuser, checkroles(['feedback_change']), catchError(feedback.delete_feedback));



module.exports = router;