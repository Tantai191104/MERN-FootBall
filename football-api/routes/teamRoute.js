const express = require("express");
const teamRouter = express.Router();
const teamController = require("../controller/teamController");
const authorizeAdmin = require("../middleware/authorizeAdmin");
const authMiddleware = require("../middleware/authMiddleware");
teamRouter.get("/", teamController.getAllTeams);
teamRouter.post(
  "/",
  authMiddleware,
  authorizeAdmin,
  teamController.createATeam
);
teamRouter.put(
  "/:teamId",
  authMiddleware,
  authorizeAdmin,
  teamController.updateTeam
);
teamRouter.delete(
  "/:teamId",
  authMiddleware,
  authorizeAdmin,
  teamController.deleteTeam
);
module.exports = teamRouter;
