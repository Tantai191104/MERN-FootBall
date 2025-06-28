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
    "https://bshc.com.vn/wp-content/uploads/2023/05/a5291a47-27f7-4d8d-b087-11263a97295b-1.jpg",
  cost: 150000000,
  isCaptain: true,
  infomation:
    "Legendary Argentinian forward known for his dribbling and vision.",
  comments: [
    {
      rating: 2,
      content: "Một cầu thủ tuyệt vời với kỹ năng xuất sắc!",
      author: {
        membername: "ronaldoFan7",
        password: "secure123",
        name: "Minh",
        YOB: 1999,
        isAdmin: false,
        createdAt: "2024-05-01T10:00:00Z",
        updatedAt: "2024-05-01T10:00:00Z",
      },
      createdAt: "2024-06-01T14:20:00Z",
      updatedAt: "2024-06-01T14:20:00Z",
    },
    {
      rating: 1,
      content: "Chơi rất hay nhưng đôi lúc hơi cá nhân.",
      author: {
        membername: "footballLover",
        password: "pass456",
        name: "Hùng",
        YOB: 1995,
        isAdmin: false,
        createdAt: "2023-12-11T08:00:00Z",
        updatedAt: "2023-12-11T08:00:00Z",
      },
      createdAt: "2024-06-02T09:10:00Z",
      updatedAt: "2024-06-02T09:10:00Z",
    },
    {
      rating: 3,
      content: "Phong độ gần đây không ổn định lắm.",
      author: {
        membername: "realTalk",
        password: "xyz789",
        name: "Lan",
        YOB: 1992,
        isAdmin: false,
        createdAt: "2022-07-21T17:00:00Z",
        updatedAt: "2022-07-21T17:00:00Z",
      },
      createdAt: "2024-06-03T18:30:00Z",
      updatedAt: "2024-06-03T18:30:00Z",
    },
    {
      rating: 2,
      content: "Một biểu tượng sống của bóng đá!",
      author: {
        membername: "legendLover",
        password: "legendpass",
        name: "Duy",
        YOB: 1987,
        isAdmin: true,
        createdAt: "2021-01-01T00:00:00Z",
        updatedAt: "2021-01-01T00:00:00Z",
      },
      createdAt: "2024-06-04T12:45:00Z",
      updatedAt: "2024-06-04T12:45:00Z",
    },
  ],
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
