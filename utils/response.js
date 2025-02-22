module.exports = {
  successResponse: (res, statusCode, message, datainfo = null, data = null) => {
    const responseObj = {
      success: true,
      message,
    };

    if (datainfo !== null && datainfo !== undefined) {
      responseObj.datainfo = datainfo; 
    }

    responseObj.data = data; 

    return res.status(statusCode).json(responseObj);
  },

  errorResponse: (res, statusCode, message, error = null) => {
    return res.status(statusCode).json({
      success: false,
      message,
      error,
    });
  },
};
