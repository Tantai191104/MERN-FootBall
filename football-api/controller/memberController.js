const Member = require("../models/members");
const { sendResponse } = require("../utils/apiResponse");
const bcrypt = require("bcrypt");

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const memberId = req.user?.id;
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
    console.log(newPassword);
    console.log(confirmNewPassword);

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

exports.updateProfile = async (req, res) => {
  try {
    const { name, YOB } = req.body;

    if (!name || !YOB) {
      return sendResponse(res, 400, false, null, "Name and YOB are required");
    }

    const memberId = req.user?.id;
    if (!memberId) {
      return sendResponse(
        res,
        401,
        false,
        null,
        "Unauthorized or missing user ID"
      );
    }

    const updatedMember = await Member.findByIdAndUpdate(
      memberId,
      { name, YOB },
      { new: true }
    );

    if (!updatedMember) {
      return sendResponse(res, 404, false, null, "Member not found");
    }
    console.log(updatedMember);
    return sendResponse(
      res,
      200,
      true,
      updatedMember,
      "Profile updated successfully"
    );
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};

exports.getAllMembers = async (req, res) => {
  try {
    const currentUserId = req.user.id; 
    const members = await Member.find({ _id: { $ne: currentUserId } }).sort({ createdAt: -1 });
    return sendResponse(res, 200, true, members, null);
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};
