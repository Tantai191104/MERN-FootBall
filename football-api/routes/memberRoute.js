const express = require("express");
const memberRouter = express.Router();
const memberController = require("../controller/memberController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/authorizeAdmin");
memberRouter.post(
  "/changePassword",
  authMiddleware,
  memberController.changePassword
);
memberRouter.post(
  "/changeProfile",
  authMiddleware,
  memberController.updateProfile
);
memberRouter.get(
  "/",
  authMiddleware,
  authorizeAdmin,
  memberController.getAllMembers
);
module.exports = memberRouter;
