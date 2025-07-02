import { Tag } from "antd";
import type { Player } from "../../model/Types";
import { useNavigate } from "react-router-dom";
type Props = {
  player: Player;
  isOpenModal: () => void;
};

function PlayerDetailInfo({ player, isOpenModal }: Props) {
  const navigation = useNavigate()
  return (
    <section className="w-full md:w-1/2 space-y-4 p-6 rounded-2xl border border-[#C0EB6A] shadow-md bg-white">
      <h1 className="text-4xl font-extrabold text-[#485550] mb-3">
        {player.playerName}
      </h1>
      <hr className="border-t-2 border-[#485550] w-full opacity-40" />

      <p className="text-lg text-[#485550] flex items-center gap-3">
        <strong>Team</strong>
        <span className="text-[#485550] text-lg leading-none">●</span>
        <span className="text-[#485550] font-medium">
          {player.team.teamName}
        </span>
      </p>

      <p className="text-lg text-[#485550] flex items-center gap-3">
        <strong>Transfer Fee:</strong>
        <span className="text-green-700 font-semibold">
          ${player.cost.toLocaleString()}
        </span>
      </p>

      {player.isCaptain && (
        <Tag
          color="gold"
          className="text-sm font-semibold px-3 py-1 rounded-xl"
        >
          Captain
        </Tag>
      )}

      <p className="mt-3">
        <strong className="text-lg text-[#485550]">Infomation :</strong>
      </p>
      <p className="text-md text-gray-700 leading-relaxed">
        {player.information}
      </p>

      <p className="text-sm text-gray-500">
        Created at: {player.createdAt?.slice(0, 10)}
      </p>
      <p className="text-sm text-gray-500">
        Last updated: {player.updatedAt?.slice(0, 10)}
      </p>

      <div className="flex gap-3 justify-center space-x-5">
        <button
          onClick={isOpenModal}
          className="bg-[#C0EB6A] text-[#485550] rounded-xl px-6 py-3 text-sm font-semibold hover:bg-[#b5e155] transition cursor-pointer"
        >
          Add Comment
        </button>
        <button onClick={() => navigation("/")} className="bg-[#C0EB6A] text-[#485550] rounded-xl px-6 py-3 text-sm font-semibold hover:bg-[#b5e155] transition cursor-pointer">
          Back to Players
        </button>
      </div>
    </section>
  );
}

export default PlayerDetailInfo;
