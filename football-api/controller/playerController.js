
const Player = require("../models/players");
const { sendResponse } = require("../utils/apiResponse");

exports.getAllPlayers = async (req, res) => {
  try {
    // filter
    const { playerName, team, pageInfo } = req.body;
    const filter = {};
    if (playerName) {
      filter.playerName = { $regex: playerName, $option: "i" };
    }
    if (team) {
      filter.team = team;
    }

    // Pagination
    const page = pageInfo?.page || 1;
    const pageSize = 8;
    const skip = (page - 1) * pageSize;

    // Query database
    const totalPlayers = await Player.countDocuments(filter);
    const totalPage = Math.ceil(totalPlayers / pageSize);
    const players = await Player.find(filter)
      .skip(skip)
      .limit(pageSize)
      .populate("team");

    // Send response
    return sendResponse(res, 200, true, {
      players,
      pageInfo: {
        page,
        pageSize,
        totalPage,
      },
    });
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};

exports.getPlayerById = async (req, res) => {
  try {
    const playerId = req.params.playerId;
    const player = await Player.findById(playerId);
    if (!player) {
      return sendResponse(res, 404, false, null, "Player not found");
    }
    return sendResponse(res, 200, true, player);
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};

exports.editPlayer = async (req, res) => {
  try {
    const { playerName, image, cost, isCaptain, information, team } = req.body;
    const playerId = req.params.playerId;
    const player = await Player.findById(playerId);
    // check exis captain
    const existingCaptain = await Player.findOne({
      team: team,
      isCaptain: true,
      _id: { $ne: playerId },
    });
    if (existingCaptain) {
      return sendResponse(res, 400, false, null, `${team} already has captain`);
    }

    // Update  data
    player.playerName = playerName;
    player.image = image;
    player.cost = cost;
    player.isCaptain = isCaptain;
    player.information = information;
    player.team = team;

    const updatedPlayer = await player.save();
    if (player) {
      return sendResponse(res, 200, true, player);
    } else {
      return sendResponse(res, 404, false, null, "Player not found");
    }
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    const playerId = req.params.playerId;

    const player = await Player.findById(playerId);

    if (!player) {
      return sendResponse(res, 404, false, null, "Player not found");
    }

    await Player.deleteOne({ _id: playerId });
    return sendResponse(res, 200, true, null, "Player deleted successfully");
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};
