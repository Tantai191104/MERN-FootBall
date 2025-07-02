export interface Team {
  _id: string;
  teamName: string;
  createdAt?: string;
  updatedAt?: string;
}
export interface Player {
  _id: string;
  playerName: string;
  image: string;
  cost: number;
  isCaptain: boolean;
  information: string;
  comments: Comment[];
  team: Team;
  createdAt?: string;
  updatedAt?: string;
}
export interface Member {
  membername: string;
  password: string;
  name: string;
  YOB: number;
  isAdmin: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Comment {
  rating: number;
  content: string;
  author: Member;
  createdAt?: string;
  updatedAt?: string;
}

