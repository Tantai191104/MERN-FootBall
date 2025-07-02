export type LoginPayload = {
  membername: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  member: {
    id: string;
    membername: string;
    isAdmin: boolean;
  };
};

export type RegisterPayload = {
  membername: string;
  password: string;
  confirmPassword : string;
  name: string;
  YOB: number;
};
