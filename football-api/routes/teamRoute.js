const express = require("express");
const teamRouter = express.Router();
const teamController = require("../controller/teamController");
teamRouter.get("/", teamController.getAllTeams);
teamRouter.post("/", teamController.createATeam);
teamRouter.put("/:teamId", teamController.updateTeam);
teamRouter.delete("/:teamId", teamController.deleteTeam);
module.exports = teamRouter;
