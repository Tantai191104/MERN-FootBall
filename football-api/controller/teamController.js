const Team = require("../models/teams");
const Player = require("../models/players");
const { sendResponse } = require("../utils/apiResponse");

exports.createATeam = async (req, res) => {
  try {
    const { teamName } = req.body;
    if (!teamName || teamName.trim() === "") {
      return sendResponse(res, 400, false, null, "Team name is required.");
    }
    const newTeam = await Team.create({ teamName });
    return sendResponse(res, 201, true, newTeam, "Team created successfully");
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};

exports.getAllTeams = async (req, res) => {
  try {
    const teams = Team.find({});
    return sendResponse(res, 200, true, teams);
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};

exports.updateTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { teamName } = req.body;

    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      { teamName },
      { new: true, runValidators: true }
    );

    if (!updatedTeam) {
      return sendResponse(res, 404, false, null, "Team not found");
    }

    return sendResponse(
      res,
      200,
      true,
      updatedTeam,
      "Team updated successfully"
    );
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};

exports.deleteTeam = async (req, res) => {
  try {
    const { teamId } = req.params;

    // check containing player
    const player = await Player.findOne({ team: teamId });
    if (player) {
      return sendResponse(res, 400, false, null, "Cannot delete team: It still has players.");
    }
    
    //delete team
    const deletedTeam = await Team.findByIdAndDelete(teamId);
    if (!deletedTeam) {
      return sendResponse(res, 404, false, null, "Team not found.");
    }

    return sendResponse(res, 200, true, deletedTeam, "Team deleted successfully.");
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};

