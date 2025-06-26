import type { Player } from "../model/Types";

type PlayerCardListProps = {
  players: Player[];
};

function PlayerCard({ players }: PlayerCardListProps) {
  return (
    <div className="max-w-6xl mx-auto mt-4 mb-4 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {players.map((player) => (
        <div
          key={player._id}
          className="bg-[#F4F6F0] border-2 border-[#485550] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 duration-300 group"
        >
          {/* Image */}
          <div className="relative">
            <img
              src={player.image}
              alt={player.playerName}
              className="w-full h-52 object-cover"
            />

            {/* Captain badge */}
            {player.isCaptain && (
              <span className="absolute top-2 right-2 bg-[#C0EB6A] text-[#485550] text-xs font-bold px-2 py-1 rounded shadow">
                Captain
              </span>
            )}
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="text-xl font-bold text-[#485550] mb-1">
              {player.playerName}
            </h3>
            <p className="text-sm text-[#485550] mb-2 flex items-center gap-1">
              <span className="font-medium">Team</span>
              <span className="text-[#485550] text-lg leading-none">●</span>
              <span className="font-medium text-[#1e293b]">
                {player.team.teamName}
              </span>
            </p>
            <p className="text-sm text-[#485550] font-semibold mb-4">
              Transfer Fee : ${player.cost.toLocaleString()}
            </p>
            <button className="w-full py-2 bg-[#C0EB6A] text-[#485550] rounded-xl text-sm font-semibold hover:bg-[#b5e155] cursor-pointer transition">
              View Profile
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlayerCard;
