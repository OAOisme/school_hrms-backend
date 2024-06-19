const recruitmentModel = require('../models/recruitment');
const audit = require('../middleware/audit');
const recruitmentResult = require('../models/recruitmentResult');

module.exports.create_recruitment = async (req, res, next) => {
    const recruitment = new recruitmentModel({
        school: req.school._id,
        questions: req.body.questions,
        name: req.body.name,
        description: req.body.description
    });
    const result = await recruitment.save()

    audit('Create recruitment', 'Recruitment', req.school._id);
    res.status(201).json({
        message: 'Recruitment created successfully!',
        result: result
    });
}


module.exports.get_all_recruitments = async (req, res, next) => {
    const recruitments = await recruitmentModel.find({ school: req.school._id })

    res.status(200).json({
        recruitments: recruitments
    });
    recruitments.length > 0 ? audit('Get all recruitments', 'Recruitment', req.school._id) : "";
}

module.exports.get_all_results = async (req, res, next) => {
    const recruitments = await recruitmentResult.find({ school: req.school._id, recruitment: req.params.id })

    res.status(200).json({
        recruitments: recruitments
    });
    recruitments.length > 0 ? audit('Get all recruitments', 'Recruitment', req.school._id) : "";
}

module.exports.get_openings = async (req, res, next) => {
    const recruitments = await recruitmentModel.find({ school: req.params.id, status: "active" })

    res.status(200).json({
        recruitments: recruitments
    });
    recruitments.length > 0 ? audit('Get all recruitments', 'Recruitment', recruitments[0].school) : "";
}

module.exports.get_recruitment = async (req, res, next) => {
    const recruitment = await recruitmentModel.findById(req.params.id)

    res.status(200).json({
        recruitment: recruitment
    });

    recruitment > 0 ? audit('Get recruitment', 'Recruitment', requirement.school) : "";
}

module.exports.update_recruitment = async (req, res, next) => {
    console.log(req.body);
    const recruitment = await recruitmentModel.findById(req.params.id);
    recruitment.name = req.body.name;
    recruitment.description = req.body.description;
    recruitment.questions = req.body.questions;
    recruitment.status = req.body.status;
    const result = await recruitment.save()

    res.status(200).json({
        message: 'Recruitment updated successfully!',
        result: result
    });
}

module.exports.submit_recruitment = async (req, res, next) => {
    const recruitment = await recruitmentModel.findById(req.params.id);
    const recruitmentresult = new recruitmentResult({
        recruitment: recruitment._id,
        school: recruitment.school,
        answers: req.body.answers,
        employee: req.body.employee
    });
    const result = await recruitmentresult.save()

    res.status(200).json({
        message: 'Recruitment submitted successfully!',
        result: result
    });

}