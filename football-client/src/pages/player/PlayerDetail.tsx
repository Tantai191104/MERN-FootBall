import { useEffect, useState } from "react";
import PlayerDetailInfo from "./PlayerDetailInfo";
import PlayerCommentList from "./PlayerCommentList";
import CommentModal from "../../components/CommentModal";
import { useNavigate, useParams } from "react-router-dom";
import type { Player } from "../../model/Types";
import {
  addAComment,
  deleteAComment,
  fetchPlayerById,
  type commentPayload,
} from "../../services/playerService";
import { toast } from "react-toastify";
import { useAuthStore } from "../../stores/useAuthStore";
import { Modal } from "antd";

function PlayerDetail() {
  const { playerId } = useParams<{ playerId: string }>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [player, setPlayer] = useState<Player | null>(null);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const navigation = useNavigate();

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

  const requiredToOpenModal = () => {
    if (!isAuthenticated) {
      toast.warning("You have to login before comment");
      navigation("/auth/login");
      return;
    }
    const currentUserId = user?.id;

    const hasCommented = player?.comments?.some(
      (comment) => comment.author._id === currentUserId
    );

    if (hasCommented) {
      toast.warning("You have already commented on this player.");
      return;
    }

    setIsModalOpen(true);
  };

  const handleAddComment = async (content: string, rating: number) => {
    console.log(content);
    console.log(rating);
    try {
      const commentPayload: commentPayload = {
        rating: rating,
        content: content,
        id: playerId,
      };
      console.log(commentPayload);
      const res = await addAComment(commentPayload);
      if (res.success) {
        toast.success("Add a comment successful !");
      }
    } catch (error) {
      console.log(error);
    }
    setIsModalOpen(false);
  };

  const handleDeleteComment = () => {
    if (!playerId) return;

    Modal.confirm({
      title: "Are you sure?",
      content:
        "Do you really want to delete your comment? This action cannot be undone.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const res = await deleteAComment(playerId);
          if (res.success) {
            toast.success(res.message || "Comment deleted successfully");
            
            const updated = await fetchPlayerById(playerId);
            if (updated.success) {
              setPlayer(updated.data);
            }
          }
        } catch (error) {
          console.log(error);
          toast.error("Failed to delete comment");
        }
      },
    });
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

        <PlayerDetailInfo player={player} isOpenModal={requiredToOpenModal} />
        <CommentModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddComment}
        />
      </div>
      <PlayerCommentList
        comments={player.comments}
        onDelete={handleDeleteComment}
      />
    </div>
  );
}

export default PlayerDetail;
