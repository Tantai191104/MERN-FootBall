const { sendResponse } = require("../utils/apiResponse");

const authorizeAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return sendResponse(res, 403, false, null, "Access denied. Admins only.");
  }

  next();
};

module.exports = authorizeAdmin;
