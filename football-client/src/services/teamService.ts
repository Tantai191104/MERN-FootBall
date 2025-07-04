import api from "../apiClient";
import type { ApiResponse } from "../model/ApiResponse";
import type { Team } from "../model/Types";

export const getAllTeam = async (): Promise<ApiResponse<Team[]>> => {
  const res = await api.get("/teams");
  return res.data;
};

export const addATeam = async (
  teamName: string
): Promise<ApiResponse<null>> => {
  const res = await api.post(`/teams`, {teamName});
  return res.data;
};

export const deleteATeam = async (teamId : string) : Promise<ApiResponse<null>> =>{
  const res = await api.delete(`/teams/${teamId}`)
  return res.data
}