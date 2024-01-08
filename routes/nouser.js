const express = require('express');
const router = express.Router();

const assessment = require('../controllers/assessment');
const recruitment = require('../controllers/recruitment');
const role = require('../controllers/role');

const { catchError } = require('../middleware/errors');

//ASSESSMENT ROUTES
router.route('/assessments/:id')
    .get(catchError(assessment.get_assessment))
    .post(catchError(assessment.submit_assessment))

//RECRUITMENT ROUTES
router.route('/recruitment/:id')
    .get(catchError(recruitment.get_recruitment))
    .post(catchError(recruitment.submit_recruitment))

router.route('/openings/:id')
    .get(catchError(recruitment.get_openings))

router.route('/permissions')
    .get(catchError(role.get_all_permissions))


module.exports = router;