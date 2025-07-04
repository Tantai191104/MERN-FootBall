import { Tag, Rate } from "antd";
import type { Player } from "../../model/Types";
import { useNavigate } from "react-router-dom";

type Props = {
  player: Player;
  isOpenModal: () => void;
  userRating?: number | null;
};

function PlayerDetailInfo({ player, isOpenModal, userRating }: Props) {
  const navigate = useNavigate();

  return (
    <section className="w-full md:w-1/2 space-y-4 p-6 rounded-2xl border border-[#C0EB6A] shadow-lg bg-white">
      {/* Player Name */}
      <h1 className="text-4xl font-extrabold text-[#1e293b] mb-2">
        {player.playerName}
      </h1>

      {/* Team Info */}
      <div className="flex items-center gap-3">
        <strong className="text-[#475569]">Team:</strong>
        <span className="text-[#334155] font-medium">
          {player.team?.teamName ?? "No Team"}
        </span>
      </div>

      {/* Transfer Fee */}
      <div className="flex items-center gap-3">
        <strong className="text-[#475569]">Transfer Fee:</strong>
        <span className="text-green-700 font-bold text-lg">
          ${player.cost.toLocaleString()}
        </span>
      </div>

      {/* Captain Tag */}
      {player.isCaptain && (
        <Tag
          color="gold"
          className="text-sm font-semibold px-3 py-1 rounded-xl"
        >
          Captain
        </Tag>
      )}

      {/* User Rating */}
      {userRating != null && (
        <div className="mt-2">
          <p className="text-[#2563eb] font-semibold text-sm">
            You rated this player:
          </p>
          <Rate disabled defaultValue={userRating} />
        </div>
      )}

      {/* Info */}
      <div>
        <p className="text-[#475569] font-semibold text-lg mb-1">
          Information:
        </p>
        <p className="text-gray-700 leading-relaxed">{player.information}</p>
      </div>

      {/* Dates */}
      <div className="text-sm text-gray-500 space-y-1">
        <p>Created at: {player.createdAt?.slice(0, 10)}</p>
        <p>Last updated: {player.updatedAt?.slice(0, 10)}</p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
        <button
          onClick={isOpenModal}
          className="bg-[#C0EB6A] hover:bg-[#b8e453] text-[#1e293b] font-semibold px-6 py-3 rounded-xl transition"
        >
          Add Comment
        </button>
        <button
          onClick={() => navigate("/")}
          className="bg-white hover:bg-gray-100 text-[#1e293b] border border-[#C0EB6A] font-semibold px-6 py-3 rounded-xl transition"
        >
          Back to Players
        </button>
      </div>
    </section>
  );
}

export default PlayerDetailInfo;
