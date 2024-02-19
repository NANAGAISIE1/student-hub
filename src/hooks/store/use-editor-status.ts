import { create } from "zustand";

type EditorStatusStore = {
  saveStatus: "Saved" | "Unsaved";
  setSaveStatus: (status: "Saved" | "Unsaved") => void;
};

export const useEditorStatus = create<EditorStatusStore>((set, get) => ({
  saveStatus: "Saved",
  setSaveStatus: (state: "Saved" | "Unsaved") => set({ saveStatus: state }),
}));
