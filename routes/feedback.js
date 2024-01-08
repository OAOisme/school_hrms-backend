const express = require('express');
const router = express.Router();
const { checkadmin } = require('../middleware/authentication')
const { catchError } = require('../middleware/errors');

const feedback = require('../controllers/feedback');

router.route('/')
    .get(checkadmin, catchError(feedback.get_feedback))
    .post(catchError(feedback.create_feedback));

router.route('/:id')
    .get(checkadmin, catchError(feedback.get_one_feedback))
    .delete(checkadmin, catchError(feedback.delete_feedback));

module.exports = router;