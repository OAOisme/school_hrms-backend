const assessmentModel = require('../models/assessment');
const assessmentResult = require('../models/assessmentResult');

//Middleware
const audit = require('../middleware/audit');

module.exports.create_assessment = async (req, res, next) => {
    const assessment = new assessmentModel({
        name: req.body.name,
        school: req.school._id,
        assessmentroles: req.body.assessmentroles,
        questions: req.body.questions
    });
    const result = await assessment.save()
    audit('Create assessment', 'Assessment', req.school._id);
    res.status(201).json({
        message: 'Assessment created successfully!',
        result: result
    });
}


module.exports.get_all_assessments = async (req, res, next) => {
    const assessments = await assessmentModel.find({ school: req.school._id })

    res.status(200).json({
        assessments: assessments
    });
    audit('Get all assessments', 'Assessment', req.school._id);
}

module.exports.get_all_results = async (req, res, next) => {
    const assessments = await assessmentResult.find({ school: req.school._id, assessment: req.params.id })

    res.status(200).json({
        assessments: assessments
    });
    audit('Get all assessments', 'Assessment', req.school._id);
}

module.exports.get_assessment = async (req, res, next) => {
    const assessment = await assessmentModel.findById(req.params.id)

    res.status(200).json({
        assessment: assessment
    });
    audit('Get assessment', 'Assessment', req.school._id);
}

module.exports.update_assessment = async (req, res, next) => {
    const assessment = await assessmentModel.findById(req.params.id);
    assessment.name = req.body.name;
    assessment.assessmentroles = req.body.assessmentroles;
    assessment.questions = req.body.questions;
    assessment.status = req.body.status;
    const result = await assessment.save()
    res.status(200).json({
        message: 'Assessment updated successfully!',
        result: result
    });
    audit('Update assessment', 'Assessment', req.school._id);
}

module.exports.submit_assessment = async (req, res, next) => {
    const assessment = await assessmentModel.findById(req.params.id);
    const assessmentresult = new assessmentResult({
        assessment: assessment._id,
        employee: req.employee._id,
        answers: req.body.answers
    });
    const result = await assessmentresult.save()
    audit('Submit assessment', 'Assessment', req.school._id);
    res.status(200).json({
        message: 'Assessment submitted successfully!',
        result: result
    });
}

