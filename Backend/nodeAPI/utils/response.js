exports.apiResponse = (res, statusCode, message, data = null) => {
    res.status(statusCode).json({
        message,
        data
    });
};