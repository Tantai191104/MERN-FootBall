const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const Member = require("../models/members");
const { sendResponse } = require("../utils/apiResponse");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const crypto = require("crypto");
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
          name: existingMember.name,
          YOB: existingMember.YOB,
          isAdmin: existingMember.isAdmin,
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

exports.loginGoogle = async (req, res) => {
  try {
    const { token } = req.body; 

    if (!token) {
      return sendResponse(res, 400, false, null, "No token provided");
    }

    // Xác thực token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID || "your_google_client_id",
    });

    const payload = ticket.getPayload();
    const email = payload.email;
    const name = payload.name;

    let existingMember = await Member.findOne({ membername: email });

    if (!existingMember) {
      // Nếu chưa, tạo mới
      existingMember = await Member.create({
        membername: email,
        name,
        password: crypto.randomUUID(),
        YOB: 2000,
        isAdmin: false,
      });
    }

    // Tạo JWT
    const authToken = jwt.sign(
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
        token: authToken,
        member: {
          id: existingMember._id,
          membername: existingMember.membername,
          name: existingMember.name,
          YOB: existingMember.YOB,
          isAdmin: existingMember.isAdmin,
        },
      },
      "Google login successful"
    );
  } catch (error) {
    console.error("Google login error:", error.message);
    return sendResponse(res, 500, false, null, "Google login failed");
  }
};