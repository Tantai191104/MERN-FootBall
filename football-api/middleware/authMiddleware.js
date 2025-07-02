const jwt = require("jsonwebtoken");
const Member = require("../models/members");
const { sendResponse } = require("../utils/apiResponse");
const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return sendResponse(res, 401, false, null, "Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );

    const member = await Member.findById(decoded.memberId).select("-password");
    if (!member) {
      return sendResponse(res, 401, false, null, "Member not found");
    }

    req.user = member;
    next();
  } catch (err) {
    return sendResponse(res, 401, false, null, "Invalid token");
  }
};

module.exports = authMiddleware;
