import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from "antd";
import { toast } from "react-toastify";

import PlayerDetailInfo from "./PlayerDetailInfo";
import PlayerCommentList from "./PlayerCommentList";
import CommentModal from "../../components/CommentModal";

import { useAuthStore } from "../../stores/useAuthStore";
import {
  fetchPlayerById,
  addAComment,
  deleteAComment,
  editAComment,
  type commentPayload,
  type editCommentPayload,
} from "../../services/playerService";
import type { Player } from "../../model/Types";

function PlayerDetail() {
  const { playerId } = useParams<{ playerId: string }>();
  const [player, setPlayer] = useState<Player | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (playerId) loadPlayerDetail();
  }, [playerId]);

  const loadPlayerDetail = async () => {
    try {
      const res = await fetchPlayerById(playerId!);
      if (res.success) {
        setPlayer(res.data);
      } else {
        toast.error("Player not found.");
      }
    } catch (error) {
      console.error("Error fetching player:", error);
    }
  };

  const handleAddComment = async (content: string, rating: number) => {
    try {
      const payload: commentPayload = { content, rating, id: playerId! };
      const res = await addAComment(payload);
      if (res.success) {
        toast.success("Comment added successfully!");
        await loadPlayerDetail();
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment.");
    }

    setIsAddModalOpen(false);
  };

  const handleDeleteComment = () => {
    Modal.confirm({
      title: "Are you sure?",
      content: "This will permanently delete your comment.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "Cancel",
      onOk: async () => {
        try {
          const res = await deleteAComment(playerId!);
          if (res.success) {
            toast.success(res.message || "Comment deleted.");
            await loadPlayerDetail();
          }
        } catch (error) {
          console.error("Error deleting comment:", error);
          toast.error("Failed to delete comment.");
        }
      },
    });
  };

  const handleEditComment = async (values: editCommentPayload): Promise<boolean> => {
    try {
      const res = await editAComment(playerId!, values);
      if (res.success) {
        toast.success("Comment updated!");
        await loadPlayerDetail();
        return true;
      } else {
        toast.error("Update failed.");
        return false;
      }
    } catch (error) {
      console.error("Error editing comment:", error);
      toast.error("Something went wrong.");
      return false;
    }
  };

  const openAddCommentModal = () => {
    if (!isAuthenticated) {
      toast.warning("Please log in before commenting.");
      navigate("/auth/login");
      return;
    }

    if (hasUserCommented) {
      toast.warning("You've already commented on this player.");
      return;
    }

    setIsAddModalOpen(true);
  };

  const hasUserCommented = useMemo(() => {
    return player?.comments?.some(
      (comment) => comment.author._id === user?.id
    );
  }, [player?.comments, user?.id]);

  const userRating = useMemo(() => {
    const found = player?.comments?.find(
      (comment) => comment.author._id === user?.id
    );
    return found?.rating ?? null;
  }, [player?.comments, user?.id]);

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
          isOpenModal={openAddCommentModal}
          userRating={userRating}
        />

        <CommentModal
          open={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddComment}
        />
      </div>

      <PlayerCommentList
        comments={player.comments}
        onDelete={handleDeleteComment}
        onEdit={handleEditComment}
      />
    </div>
  );
}

export default PlayerDetail;
