import { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import PlayerCard from "../../components/PlayerCard";
import type { Player, Team } from "../../model/Types";
import { Pagination, Select } from "antd";
import Search from "antd/es/input/Search";
import { fetchAllPlayer, type Query } from "../../services/playerService";
const teams: Team[] = [
  {
    _id: "t1",
    teamName: "Inter Miami",
    createdAt: "2023-05-01T10:00:00Z",
    updatedAt: "2023-08-01T12:00:00Z",
  },
  {
    _id: "t2",
    teamName: "Manchester City",
    createdAt: "2022-01-10T09:00:00Z",
    updatedAt: "2023-09-12T14:30:00Z",
  },
  {
    _id: "t3",
    teamName: "Paris Saint-Germain",
    createdAt: "2021-06-20T15:00:00Z",
    updatedAt: "2024-03-22T17:00:00Z",
  },
  {
    _id: "t4",
    teamName: "Real Madrid",
    createdAt: "2020-11-05T08:45:00Z",
    updatedAt: "2024-01-18T13:20:00Z",
  },
  {
    _id: "t5",
    teamName: "FC Barcelona",
    createdAt: "2020-02-10T12:00:00Z",
    updatedAt: "2024-06-01T10:00:00Z",
  },
  {
    _id: "t6",
    teamName: "Arsenal",
    createdAt: "2022-06-01T14:10:00Z",
    updatedAt: "2024-03-12T16:30:00Z",
  },
];

function HomePage() {
  const [players, setPlayers] = useState<Player[]>();
  const [query, setQuery] = useState<Query>({
    playerName: null,
    team: null,
    pageInfo: {
      pagg: 1,
      pageSize: 8,
      totalPage: null,
    },
  });

  const getAllPlayer = async () => {
    try {
      const res = await fetchAllPlayer(query);
      if (res.success) {
        setPlayers(res.data.players);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPlayer();
  }, []);
  console.log(players);
  return (
    <div>
      <Banner />
      {/* Section header */}
      <section className="max-w-6xl mx-auto mt-20 mb-12 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <div>
            <p className="text-sm text-gray-500">Featured Players</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#003459]">
              Take A Look At Some Of Our Football Stars
            </h2>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-between">
          <Search
            placeholder="Search by player name"
            allowClear
            enterButton
            className="!rounded-xl max-w-sm w-full"
            size="large"
            style={{ borderRadius: 32 }}
          />

          <Select
            placeholder="Sort by team"
            allowClear
            className="max-w-sm w-[150px]"
            size="large"
            style={{ borderRadius: 50 }}
          >
            {teams.map((team) => (
              <Select.Option key={team._id} value={team.teamName}>
                {team.teamName}
              </Select.Option>
            ))}
          </Select>
        </div>
      </section>

      {Array.isArray(players) && players.length > 0 ? (
        <section id="players-section">
          <PlayerCard players={players} />
        </section>
      ) : (
        <p>No player remaining</p>
      )}

      <Pagination
        style={{ marginTop: 4 }}
        align="center"
        defaultCurrent={1}
        total={50}
      />
    </div>
  );
}

export default HomePage;
