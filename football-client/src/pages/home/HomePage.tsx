import { useEffect, useState } from "react";
import Banner from "../../components/Banner";
import PlayerCard from "../../components/PlayerCard";
import type { Player, Team } from "../../model/Types";
import { Pagination, Select } from "antd";
import Search from "antd/es/input/Search";
import { fetchAllPlayer, type Query } from "../../services/playerService";
import { getAllTeam } from "../../services/teamService";

function HomePage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [total, setTotal] = useState(0);
  const [searchText, setSearchText] = useState("");

  const [query, setQuery] = useState<Query>({
    playerName: null,
    team: null,
    pageInfo: {
      page: 1,
      pageSize: 8,
    },
  });

  const handleSelectTeam = (value: string | null) => {
    setQuery((prev) => ({
      ...prev,
      team: value || null,
      pageInfo: {
        ...prev.pageInfo,
        page: 1,
        pageSize: prev.pageInfo?.pageSize ?? 8,
      },
    }));
  };

  const getAllTeams = async () => {
    try {
      const res = await getAllTeam();
      if (res.success) {
        setTeams(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllPlayer = async () => {
    try {
      const res = await fetchAllPlayer(query);
      if (res.success) {
        setPlayers(res.data.players);
        if (res.data.pageInfo?.totalPage && res.data.pageInfo?.pageSize) {
          setTotal(res.data.pageInfo.totalPage * res.data.pageInfo.pageSize);
        } else {
          setTotal(0);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Debounce searchText -> update query
  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery((prev) => ({
        ...prev,
        playerName: searchText || null,
        pageInfo: {
          ...prev.pageInfo,
          page: 1,
          pageSize: prev.pageInfo?.pageSize ?? 8,
        },
      }));
    }, 500); // debounce 500ms

    return () => clearTimeout(timeout);
  }, [searchText]);

  useEffect(() => {
    getAllTeams();
  }, []);

  useEffect(() => {
    getAllPlayer();
  }, [query]);

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

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-between">
          <Search
            placeholder="Search by player name"
            allowClear
            enterButton
            className="!rounded-xl max-w-sm w-full"
            size="large"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ borderRadius: 32 }}
          />

          <Select
            placeholder="Sort by team"
            allowClear
            className="max-w-sm w-[150px]"
            size="large"
            style={{ borderRadius: 50 }}
            value={query.team || undefined}
            onChange={handleSelectTeam}
          >
            {teams.map((team) => (
              <Select.Option key={team._id} value={team._id}>
                {team.teamName}
              </Select.Option>
            ))}
          </Select>
        </div>
      </section>

      {/* Player Cards */}
      {players.length > 0 ? (
        <section id="players-section">
          <PlayerCard players={players} />
        </section>
      ) : (
        <p className="text-center text-gray-500 italic">No player remaining</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <Pagination
          current={query.pageInfo?.page}
          pageSize={query.pageInfo?.pageSize}
          total={total}
          showSizeChanger={false}
          onChange={(page) => {
            setQuery((prev) => ({
              ...prev,
              pageInfo: {
                page,
                pageSize: prev.pageInfo?.pageSize ?? 8,
              },
            }));
          }}
        />
      </div>
    </div>
  );
}

export default HomePage;
