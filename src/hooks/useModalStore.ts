import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ModalState {
  isGroupModalOpen: boolean;
  openGroupModal: () => void;
  closeGroupModal: () => void;
}

export const useModalStore = create<ModalState>()(
  immer((set) => ({
    isGroupModalOpen: false,
    openGroupModal: () => {
      set((state) => {
        state.isGroupModalOpen = true;
      });
    },
    closeGroupModal: () => {
      set((state) => {
        state.isGroupModalOpen = false;
      });
    },
  }))
);
