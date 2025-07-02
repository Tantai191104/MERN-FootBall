const express = require("express");
const memberRouter = express.Router();
const memberController = require("../controller/memberController");
const authMiddleware = require("../middleware/authMiddleware");
memberRouter.post(
  "/changePassword",
  authMiddleware,
  memberController.changePassword
);
memberRouter.post(
  "/changeProfile",
  authMiddleware,
  memberController.changePassword
);
module.exports = memberRouter;
