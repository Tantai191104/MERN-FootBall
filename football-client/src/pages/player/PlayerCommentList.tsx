import { Card, Rate, Tag } from "antd";
import type { Comment } from "../../model/Types";
import { useAuthStore } from "../../stores/useAuthStore";
import { EditOutlined, DeleteOutlined } from "../../components/Icon/AntdIcons";
type Props = {
  comments: Comment[];
  onDelete: () => void;
};

export default function PlayerCommentList({ comments, onDelete }: Props) {
  const user = useAuthStore((state) => state.user);
  const currentUserId = user?.id;

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
          {sortedComments.map((cmt, idx) => {
            const isCurrentUser = cmt.author._id === currentUserId;

            return (
              <Card
                key={idx}
                className="!mb-6 !bg-white !border !border-[#D1D5DB] !shadow-md !rounded-xl px-6 py-4"
              >
                <div className="flex flex-col gap-2">
                  <Rate
                    disabled
                    value={cmt.rating}
                    count={cmt.rating}
                    className="text-yellow-400"
                  />
                  <p className="text-[#1f2937] text-base">{cmt.content}</p>

                  <div className="text-sm text-gray-700 font-medium flex items-center gap-2">
                    <span>By {cmt.author.name || "NA"}</span>
                    {isCurrentUser && <Tag color="gold">Your comment</Tag>}
                  </div>

                  <p className="text-sm text-gray-500 italic mt-1">
                    {cmt.createdAt
                      ? `Posted on ${new Date(
                          cmt.createdAt
                        ).toLocaleDateString()}`
                      : "Posted date unknown"}
                  </p>
                  {isCurrentUser && (
                    <div className="flex gap-3 mt-3">
                      <button className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-xl shadow-md transition-all duration-200 hover:bg-blue-700 hover:scale-105">
                        <EditOutlined />
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete()}
                        className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-xl shadow-md transition-all duration-200 hover:bg-red-700 hover:scale-105"
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
    </div>
  );
}
