const express = require("express");
const authRouter = express.Router();
const authController = require("../controller/authController");

authRouter.post("/signIn", authController.signIn);
authRouter.post("/signUp", authController.signUp);

module.exports = authRouter;
