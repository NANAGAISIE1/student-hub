import { create } from "zustand";

type SearchDialogState = {
  open: boolean;
  toggle: () => void;
};

export const useSearchDialog = create<SearchDialogState>((set) => ({
  open: false,
  toggle: () => set((state) => ({ open: !state.open })),
}));
