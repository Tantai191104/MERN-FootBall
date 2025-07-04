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
    YOB: number;
    name: string;
  };
};

export type RegisterPayload = {
  membername: string;
  password: string;
  confirmPassword: string;
  name: string;
  YOB: number;
};

export type GoogleLoginPayload = {
  token: string;
};
