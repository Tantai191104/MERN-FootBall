const Member = require("../models/Member");
const { sendResponse } = require("../utils/apiResponse");
const Player = require("../models/players")
exports.addAComment = async (req, res) => {
  try {
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};
