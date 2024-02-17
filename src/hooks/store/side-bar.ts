import { create } from "zustand";

type SearchStore = {
  isOpen: boolean;
  setIsOpen: () => void;
};

export const useSidebar = create<SearchStore>((set, get) => ({
  isOpen: false,
  setIsOpen: () => set({ isOpen: !get().isOpen }),
}));
