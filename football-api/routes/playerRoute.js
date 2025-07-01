const express = require("express");
const playerRouter = express.Router();
const playerController = require("../controller/playerController");
playerRouter.post("/",playerController.getAllPlayers)
playerRouter.get("/:playerId", playerController.getPlayerById);
playerRouter.put("/:playerId",playerController.editPlayer)
playerRouter.delete("/:playerId",playerController.deletePlayer)
playerRouter.post("/:playerId/comment",playerController.addAComment)
playerRouter.put("/:playerId/editComment",playerController.addAComment)
playerRouter.delete("/:playerId/deleteComment",playerController.deleteAComment)
module.exports = playerRouter;
    