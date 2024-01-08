const feedbackModel = require('../models/feedback');

module.exports.create_feedback = async (req, res) => {
    const feedback = new feedbackModel({
        title: req.body.title,
        feedback: req.body.feedback,
        school: req.school._id
    });
    const result = await feedback.save()
    res.status(201).json({
        message: 'Feedback created',
        feedback: result
    });
}


module.exports.get_feedback = async (req, res) => {
    const feedback = await feedbackModel.find({ school: req.school._id })
    res.status(200).json({
        feedback: feedback
    });

}

module.exports.get_one_feedback = async (req, res) => {
    const feedback = await feedbackModel.findById(req.params.id)
    res.status(200).json({
        feedback: feedback
    });
}

module.exports.delete_feedback = async (req, res) => {
    await feedbackModel.deleteOne({ _id: req.params.id })

    res.status(200).json({
        message: 'Feedback deleted'
    });
}
