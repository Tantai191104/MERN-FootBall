const express = require("express");
const playerRouter = express.Router();
const playerController = require("../controller/playerController");

playerRouter.get("/:playerId", playerController.getPlayerById);

module.exports = playerRouter;
