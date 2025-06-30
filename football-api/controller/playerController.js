const mongoose = require("mongoose");
const Player = require("../models/players");
const { sendResponse } = require("../utils/apiResponse");

exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    return sendResponse(res, 200, true, players);
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};

exports.getPlayerById = async (req, res) => {
  try {
    const playerId = req.params.playerId;
    const player = await Player.findById(playerId);

    if (player) {
      return sendResponse(res, 200, true, player);
    } else {
      return sendResponse(res, 404, false, null, "Player not found");
    }
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};
