exports.sendResponse = (res, statusCode, success, data) => {
  res.status(statusCode).json({
    success,
    data,
  });
};
