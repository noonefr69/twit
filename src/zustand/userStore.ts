// zustand/userStore.ts
import { UserStore } from "@/types/type";
import { create } from "zustand";

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("http://localhost:3000/api/user", {
        cache: "no-store",
      }); 
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();

      const safeUser = {
        _id: data._id,
        name: data.name,
        image: data.image,
        cover: data.cover,
        bio: data.bio,
        savedPost: data.savedPost,
        following: data.following,
        followers: data.followers,
        createdAt: data.createdAt,
      };

      set({ user: safeUser, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  setUser: (user) => set({ user }),
}));
