import { Card, Rate } from "antd";
import type { Comment } from "../../model/Types";

type Props = {
  comments: Comment[];
};

export default function PlayerCommentList({ comments }: Props) {
  return (
    <div className="max-w-7xl mt-10 p-6 rounded-2xl border border-[#E2E8F0] bg-[#F9FAFB] shadow-xl">
      <h3 className="text-2xl font-bold text-[#003459] border-b border-gray-300 pb-2">
        Comments
      </h3>

      {comments.length === 0 ? (
        <p className="text-gray-500 text-center italic py-6">
          No comments yet.
        </p>
      ) : (
        <div className="mt-6">
          {comments.map((cmt, idx) => (
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
                <p className="text-sm text-gray-700 font-medium">
                  By {cmt.author.name}
                </p>
                <p className="text-sm text-gray-500 italic mt-1">
                  {cmt.createdAt
                    ? `Posted on ${new Date(
                        cmt.createdAt
                      ).toLocaleDateString()}`
                    : "Posted date unknown"}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
