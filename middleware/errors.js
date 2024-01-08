// Desc: Error handling middleware
module.exports.catchError = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    }
}