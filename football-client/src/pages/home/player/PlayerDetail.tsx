// import React from "react";
// import type { Player } from "../model/Types";

import { useState } from "react";
import PlayerDetailInfo from "./PlayerDetailInfo";
import { message } from "antd";
import CommentModal from "../../../components/CommentModal";
import PlayerCommentList from "./PlayerCommentList";

// type Props = {
//   player: Player;
// };
const player = {
  _id: "p1",
  playerName: "Lionel Messi",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/6/68/Leo_Messi_%28cropped%29.jpg",
  cost: 150000000,
  isCaptain: true,
  infomation:
    "Legendary Argentinian forward known for his dribbling and vision.",
  comments: [],
  team: {
    _id: "t1",
    teamName: "Inter Miami",
    createdAt: "2023-05-01T10:00:00Z",
    updatedAt: "2023-08-01T12:00:00Z",
  },
  createdAt: "2025-06-01T10:15:00Z",
  updatedAt: "2025-06-01T11:00:00Z",
};

function PlayerDetail() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleAddComment = async (content: string, rating: number) => {
    console.log(content);
    console.log(rating);
    message.success("Added!");
    setIsModalOpen(false);
  };
  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-10">
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
