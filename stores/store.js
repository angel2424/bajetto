import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  userCookies: null,
  loading: true,
  updateUser: (data) =>
    set((state) => ({
      user: data,
    })),
  updateLoading: (bool) =>
    set((state) => ({
      user: bool,
    })),
}));
