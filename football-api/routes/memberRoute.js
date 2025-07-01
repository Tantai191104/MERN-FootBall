const express = require("express");
const memberRouter = express.Router();
const memberController = require("../controller/memberController");
memberRouter.post("/changePassword", memberController.changePassword);
module.exports = memberRouter;
