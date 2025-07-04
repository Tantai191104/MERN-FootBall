import api from "../apiClient";
import type { ApiResponse } from "../model/ApiResponse";
import type { Player } from "../model/Types";

export type Query = {
  playerName?: string | null;
  team?: string | null;
  pageInfo?: {
    page: number;
    pageSize: number;
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

export type commentPayload = {
  id: string | undefined;
  content: string;
  rating: number;
};

export type editCommentPayload = {
  content: string;
  rating: number;
};

export type addAPlayerPayload = {
  playerName: string;
  image: string;
  cost: number;
  isCaptain: boolean;
  information: string;
  comments: Comment[];
  team: string;
};

export const fetchAllPlayer = async (
  query: Query
): Promise<ApiResponse<ResponsePlayer>> => {
  const res = await api.post("/players", query);
  return res.data;
};
export const fetchPlayerById = async (
  id: string
): Promise<ApiResponse<Player>> => {
  const res = await api.get(`/players/${id}`);
  return res.data;
};

export const addAPlayer = async (
  values: addAPlayerPayload
): Promise<ApiResponse<null>> => {
  const res = await api.post(`/players/add`, values);
  return res.data;
};

export const editAPlayer = async (
  playerId: string,
  values: addAPlayerPayload
): Promise<ApiResponse<null>> => {
  const res = await api.put(`/players/${playerId}`, values);
  return res.data;
};

export const deletePlayerById = async (
  id: string
): Promise<ApiResponse<null>> => {
  const res = await api.delete(`/players/${id}`);
  return res.data;
};

export const addAComment = async (values: commentPayload) => {
  const { id, ...commentData } = values;
  console.log(id);
  const res = await api.post(`/players/${id}/comment`, commentData);
  return res.data;
};

export const deleteAComment = async (
  playerId: string
): Promise<ApiResponse<null>> => {
  const res = await api.delete(`/players/${playerId}/deleteComment`);
  return res.data;
};

export const editAComment = async (
  playerId: string,
  values: editCommentPayload
): Promise<ApiResponse<null>> => {
  const res = await api.put(`/players/${playerId}/editComment`, values);
  return res.data;
};
