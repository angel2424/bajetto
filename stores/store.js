import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  userCookies: null,
  updateUser: (data) =>
    set((state) => ({
      user: data,
    })),
}));
