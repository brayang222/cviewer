import { AuthStoreType } from "@/types/auth";
import { create, StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

const storeApi: StateCreator<AuthStoreType> = (set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set(() => ({ user })),
});

export const useAuthStore = create<AuthStoreType>()(
  devtools(persist(storeApi, { name: "user-store" }))
);
