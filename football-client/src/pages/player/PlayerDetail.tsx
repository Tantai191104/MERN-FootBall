// import React from "react";
// import type { Player } from "../model/Types";

import { useEffect, useState } from "react";
import PlayerDetailInfo from "./PlayerDetailInfo";
import { message } from "antd";
import PlayerCommentList from "./PlayerCommentList";
import CommentModal from "../../components/CommentModal";
import { useParams } from "react-router-dom";
import type { Player } from "../../model/Types";
import { fetchPlayerById } from "../../services/playerService";

function PlayerDetail() {
  const { playerId } = useParams<{ playerId: string }>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    if (!playerId) return;

    const getPlayerById = async (playerId: string) => {
      try {
        const res = await fetchPlayerById(playerId);
        if (res.success) {
          setPlayer(res.data);
        } else {
          console.log("Player not found ");
        }
      } catch (error) {
        console.error("Lỗi khi lấy cầu thủ:", error);
      }
    };

    getPlayerById(playerId);
  }, [playerId]);
  console.log(player);

  const handleAddComment = async (content: string, rating: number) => {
    console.log(content);
    console.log(rating);
    message.success("Added!");
    setIsModalOpen(false);
  };

  if (!player) {
    return (
      <div className="text-center text-xl text-red-500 mt-10">
        Player not found.
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-10 p-6">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <section className="w-full md:w-1/2 relative">
          <img
            src={player.image}
            alt={player.playerName}
            className="max-w-md max-h-[500px] object-cover rounded-2xl shadow-lg mx-auto"
          />
        </section>

        <PlayerDetailInfo
          player={player}
          isOpenModal={() => setIsModalOpen(true)}
        />
        <CommentModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddComment}
        />
      </div>
      <PlayerCommentList comments={player.comments} />
    </div>
  );
}

export default PlayerDetail;
