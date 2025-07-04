const express = require("express");
const authRouter = express.Router();
const authController = require("../controller/authController");

authRouter.post("/signIn", authController.signIn);
authRouter.post("/signUp", authController.signUp);
authRouter.post("/google" , authController.loginGoogle)
module.exports = authRouter;
