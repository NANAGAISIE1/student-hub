import { create } from "zustand";

const saveStatus = "Saved" || "Unsaved";

type EditorStatusStore = {
  saveStatus: typeof saveStatus;
  setSaveStatus: (status: typeof saveStatus) => void;
};

export const useEditorStatus = create<EditorStatusStore>((set, get) => ({
  saveStatus: "Saved",
  setSaveStatus: (state: typeof saveStatus) => set({ saveStatus: state }),
}));
