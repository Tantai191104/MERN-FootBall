const mongoose = require("mongoose");
const Player = require("../models/players");
exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.json({ status: true, data: players });
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
};

    