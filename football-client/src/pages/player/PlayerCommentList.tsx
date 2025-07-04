import { Card, Input, Modal, Rate, Tag } from "antd";
import { useState } from "react";
import type { Comment } from "../../model/Types";
import { useAuthStore } from "../../stores/useAuthStore";
import { EditOutlined, DeleteOutlined } from "../../components/Icon/AntdIcons";
import type { editCommentPayload } from "../../services/playerService";

type Props = {
  comments: Comment[];
  onDelete: () => void;
  onEdit: (values: editCommentPayload) => Promise<boolean>;
};

export default function PlayerCommentList({
  comments,
  onDelete,
  onEdit,
}: Props) {
  const currentUserId = useAuthStore((state) => state.user?.id);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingComment, setEditingComment] = useState<editCommentPayload>({
    content: "",
    rating: 0,
  });

  const handleOpenEditModal = (comment: Comment) => {
    setEditingComment({
      content: comment.content,
      rating: comment.rating,
    });
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setEditingComment({ content: "", rating: 0 });
  };

  const handleConfirmEdit = async () => {
    const success = await onEdit(editingComment);
    if (success) {
      handleCloseModal();
    }
  };

  const sortedComments = [
    ...comments.filter((c) => c.author._id === currentUserId),
    ...comments.filter((c) => c.author._id !== currentUserId),
  ];

  return (
    <div className="max-w-7xl mt-10 p-6 rounded-2xl border border-[#E2E8F0] bg-[#F9FAFB] shadow-xl">
      <h3 className="text-2xl font-bold text-[#003459] border-b border-gray-300 pb-2">
        Comments
      </h3>

      {sortedComments.length === 0 ? (
        <p className="text-gray-500 text-center italic py-6">
          No comments yet.
        </p>
      ) : (
        <div className="mt-6">
          {sortedComments.map((comment, index) => {
            const isCurrentUser = comment.author._id === currentUserId;

            return (
              <Card
                key={index}
                className="!mb-6 !bg-white !border !border-[#D1D5DB] !shadow-md !rounded-xl px-6 py-4"
              >
                <div className="flex flex-col gap-2">
                  <Rate
                    disabled
                    value={comment.rating}
                    count={comment.rating}
                    className="text-yellow-400"
                  />
                  <p className="text-[#1f2937] text-base">{comment.content}</p>

                  <div className="text-sm text-gray-700 font-medium flex items-center gap-2">
                    <span>By {comment.author.name || "NA"}</span>
                    {isCurrentUser && <Tag color="gold">Your comment</Tag>}
                  </div>

                  <p className="text-sm text-gray-500 italic mt-1">
                    {comment.createdAt
                      ? `Posted on ${new Date(
                          comment.createdAt
                        ).toLocaleDateString()}`
                      : "Posted date unknown"}
                  </p>

                  {isCurrentUser && (
                    <div className="flex gap-3 mt-3">
                      <button
                        onClick={() => handleOpenEditModal(comment)}
                        className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-200"
                      >
                        <EditOutlined />
                        Edit
                      </button>
                      <button
                        onClick={onDelete}
                        className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-xl shadow-md hover:bg-red-700 hover:scale-105 transition-all duration-200"
                      >
                        <DeleteOutlined />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        open={isModalVisible}
        title="Edit Comment"
        onCancel={handleCloseModal}
        onOk={handleConfirmEdit}
        okText="Save"
        cancelText="Cancel"
      >
        <Rate
          count={3}
          value={editingComment.rating}
          onChange={(value) =>
            setEditingComment((prev) => ({ ...prev, rating: value }))
          }
        />
        <Input.TextArea
          rows={4}
          className="mt-4"
          value={editingComment.content}
          onChange={(e) =>
            setEditingComment((prev) => ({ ...prev, content: e.target.value }))
          }
        />
      </Modal>
    </div>
  );
}
