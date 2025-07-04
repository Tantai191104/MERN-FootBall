const Player = require("../models/players");
const { sendResponse } = require("../utils/apiResponse");
const mongoose = require("mongoose");
exports.getAllPlayers = async (req, res) => {
  try {
    // filter
    const { playerName, team, pageInfo } = req.body;
    console.log(playerName);
    console.log(team);
    console.log(pageInfo);
    const filter = {};
    if (playerName) {
      filter.playerName = { $regex: playerName, $options: "i" };
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
      .populate("team")
      .sort({ createdAt: -1 });

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
    const player = await Player.findById(playerId)
      .populate("team")
      .populate("comments.author", "name _id ");
    if (!player) {
      return sendResponse(res, 404, false, null, "Player not found");
    }
    return sendResponse(res, 200, true, player);
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};

exports.addAPlayer = async (req, res) => {
  try {
    const { playerName, image, cost, isCaptain, information, team } = req.body;

    // Validate cơ bản
    if (!playerName || !image || !cost || !information || !team) {
      return sendResponse(res, 400, false, null, "Missing required fields");
    }

    // Nếu đang tạo captain thì check xem team đó đã có captain chưa
    if (isCaptain) {
      const existingCaptain = await Player.findOne({
        team,
        isCaptain: true,
      }).populate("team");

      if (existingCaptain) {
        return sendResponse(
          res,
          400,
          false,
          null,
          `${
            existingCaptain.team?.teamName || "This team"
          } already has a captain`
        );
      }
    }

    // Tạo cầu thủ mới
    const newPlayer = await Player.create({
      playerName,
      image,
      cost,
      isCaptain,
      information,
      team,
      comments: [],
    });

    return sendResponse(
      res,
      201,
      true,
      newPlayer,
      "Player created successfully"
    );
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};

exports.editPlayer = async (req, res) => {
  try {
    const { playerName, image, cost, isCaptain, information, team } = req.body;
    const { playerId } = req.params;

    // 1. Kiểm tra player tồn tại
    const player = await Player.findById(playerId);
    if (!player) {
      return sendResponse(res, 404, false, null, "Player not found");
    }

    // 2. Kiểm tra đã có captain chưa (nếu đang chọn isCaptain)
    if (isCaptain) {
      const existingCaptain = await Player.findOne({
        team,
        isCaptain: true,
        _id: { $ne: playerId }, // loại trừ chính nó
      }).populate("team");

      if (existingCaptain) {
        return sendResponse(
          res,
          400,
          false,
          null,
          `${
            existingCaptain.team?.teamName || "This team"
          } already has a captain`
        );
      }
    }

    // 3. Cập nhật thông tin
    player.set({ playerName, image, cost, isCaptain, information, team });

    const updatedPlayer = await player.save();

    return sendResponse(
      res,
      200,
      true,
      updatedPlayer,
      "Player updated successfully"
    );
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

exports.addAComment = async (req, res) => {
  try {
    const { rating, content } = req.body;
    const playerId = req.params.playerId;
    const memberId = req.user?.id;
    console.log(memberId);
    if (!rating || !content) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "Rating and content are required"
      );
    }
    console.log(playerId);
    const player = await Player.findById(playerId);

    if (!player) {
      return sendResponse(res, 404, false, null, "Player not found");
    }
    const hasCommented = player.comments.some(
      (comment) => comment.author.toString() === memberId
    );

    if (hasCommented) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "You have already commented on this player"
      );
    }
    const newComment = {
      rating,
      content,
      author: memberId,
    };

    player.comments.push(newComment);
    await player.save();

    return sendResponse(
      res,
      201,
      true,
      newComment,
      "Comment added successfully"
    );
  } catch (error) {
    console.error("Error when posting comment:", error);
    return sendResponse(res, 500, false, null, error.message);
  }
};

exports.editAComment = async (req, res) => {
  try {
    const { rating, content } = req.body;
    const playerId = req.params.playerId;
    const memberId = req.user?.id;

    if (!mongoose.Types.ObjectId.isValid(playerId)) {
      return sendResponse(res, 400, false, null, "Invalid player ID");
    }

    if (!rating || !content) {
      return sendResponse(
        res,
        400,
        false,
        null,
        "Rating and content are required"
      );
    }

    const player = await Player.findById(playerId);

    if (!player) {
      return sendResponse(res, 404, false, null, "Player not found");
    }

    const comment = player.comments.find(
      (c) => c.author.toString() === memberId
    );

    if (!comment) {
      return sendResponse(res, 400, false, null, "You have not commented yet");
    }

    comment.rating = rating;
    comment.content = content;

    await player.save();

    return sendResponse(
      res,
      200,
      true,
      comment,
      "Comment updated successfully"
    );
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};

exports.deleteAComment = async (req, res) => {
  try {
    const playerId = req.params.playerId;
    const memberId = req.user?.id;

    if (!mongoose.Types.ObjectId.isValid(playerId)) {
      return sendResponse(res, 400, false, null, "Invalid player ID");
    }

    const player = await Player.findById(playerId);
    if (!player) {
      return sendResponse(res, 404, false, null, "Player not found");
    }
    console.log(memberId);
    const existingComment = player.comments.find(
      (comment) => comment.author.toString() === memberId
    );

    if (!existingComment) {
      return sendResponse(res, 400, false, null, "You have not commented yet");
    }

    player.comments = player.comments.filter(
      (comment) => comment.author.toString() !== memberId
    );

    await player.save();

    return sendResponse(res, 200, true, null, "Comment deleted successfully");
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};
