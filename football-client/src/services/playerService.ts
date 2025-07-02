import api from "../apiClient";
import type { ApiResponse } from "../model/ApiResponse";
import type { Player } from "../model/Types";

export type Query = {
  playerName?: string | null;
  team?: string | null;
  pageInfo?: {
    pagg?: number | 1;
    pageSize: 8;
    totalPage?: number | 1;
  };
};

export type ResponsePlayer = {
  players: Player[];
  pageInfo: {
    pagg?: number | 1;
    pageSize: 8;
    totalPage?: number | 1;
  };
};

export const fetchAllPlayer = async (
  query: Query
): Promise<ApiResponse<ResponsePlayer>> => {
  const res = await api.post("/players", query);
  return res.data;
};
