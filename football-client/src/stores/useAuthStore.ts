import { create } from "zustand";
export type User = {
  id: string;
  membername: string;
  YOB: number;
  name: string;
  isAdmin: boolean;
};
type AuthState = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  setUser: (updateUser: User) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated: !!localStorage.getItem("token"),

  // Set user and token when login
  setAuth: (user, token) => {
    localStorage.setItem("token", token);
    set({
      user,
      token,
      isAuthenticated: true,
    });
  },
  // update user
  setUser: (updateUser) => {
    set({ user: updateUser });
  },

  // Logout
  logout: () => {
    localStorage.removeItem("token");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
}));
