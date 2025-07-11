const express = require("express");
const playerRouter = express.Router();
const playerController = require("../controller/playerController");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/authorizeAdmin");
playerRouter.post("/",playerController.getAllPlayers)
playerRouter.post("/add",authMiddleware,authorizeAdmin,playerController.addAPlayer)
playerRouter.get("/:playerId", playerController.getPlayerById);
playerRouter.put("/:playerId",authMiddleware,authorizeAdmin,playerController.editPlayer)
playerRouter.delete("/:playerId",authMiddleware,authorizeAdmin,playerController.deletePlayer)
playerRouter.post("/:playerId/comment",authMiddleware,playerController.addAComment)
playerRouter.put("/:playerId/editComment",authMiddleware,playerController.editAComment)
playerRouter.delete("/:playerId/deleteComment",authMiddleware,playerController.deleteAComment)
module.exports = playerRouter;
    