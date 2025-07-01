const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Member = require("../models/members");
const { sendResponse } = require("../utils/apiResponse");

exports.signIn = async (req, res) => {
  try {
    const { membername, password } = req.body;

    const existingMember = await Member.findOne({ membername });

    if (!existingMember) {
      return sendResponse(res, 400, false, null, "Member not found");
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingMember.password
    );

    if (!isPasswordMatch) {
      return sendResponse(res, 401, false, null, "Invalid password");
    }

    const token = jwt.sign(
      {
        memberId: existingMember._id,
        membername: existingMember.membername,
        isAdmin: existingMember.isAdmin,
      },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1d" }
    );

    return sendResponse(
      res,
      200,
      true,
      {
        token,
        member: {
          id: existingMember._id,
          membername: existingMember.membername,
        },
      },
      "Login successful"
    );
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};

exports.signUp = async (req, res) => {
  try {
    const { membername, name, password, confirmPassword, YOB } = req.body;

    // check match password
    if (password !== confirmPassword) {
      return sendResponse(res, 400, false, null, "Passwords do not match");
    }

    // check existing member
    const existingMember = await Member.findOne({ membername });
    if (existingMember) {
      return sendResponse(res, 400, false, null, "Member name already exists");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new member
    const newMember = await Member.create({
      membername,
      name,
      password: hashedPassword,
      YOB,
    });

    return sendResponse(res, 201, true, null, "Member registered successfully");
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};

