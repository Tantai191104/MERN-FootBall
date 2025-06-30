const express = require("express");
const playerRouter = express.Router();
const playerController = require("../controller/playerController");
playerRouter.post("/",playerController.getAllPlayers)
playerRouter.get("/:playerId", playerController.getPlayerById);
playerRouter.put("/:playerId",playerController.editPlayer)
playerRouter.delete("/:playerId",playerController.deletePlayer)
module.exports = playerRouter;
    