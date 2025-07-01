const Member = require("../models/members");
const { sendResponse } = require("../utils/apiResponse");
const bcrypt = require("bcrypt");

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    // 🧩 Lấy ID từ token/session (ví dụ JWT middleware đã giải mã và gán vào req.user)
    const memberId = req.user?.memberId;
    if (!memberId) {
      return sendResponse(res, 401, false, null, "Unauthorized");
    }
    if (currentPassword === newPassword) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "New password must be different from current password"
      );
    }

    if (newPassword !== confirmNewPassword) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "Confirm password does not match"
      );
    }

    const member = await Member.findById(memberId);
    if (!member) {
      return sendResponse(res, 404, false, null, "Member not found");
    }

    const isMatch = await bcrypt.compare(currentPassword, member.password);
    if (!isMatch) {
      return sendResponse(
        res,
        401,
        false,
        null,
        "Current password is incorrect"
      );
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    member.password = hashedNewPassword;
    await member.save();

    return sendResponse(res, 200, true, null, "Password changed successfully");
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};
