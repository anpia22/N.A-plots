import { create } from "zustand";

export type PopupType = "success" | "error" | "warning" | "info";

interface PopupState {
  isOpen: boolean;
  message: string;
  title: string;
  type: PopupType;
  onClose?: () => void;
  showPopup: (message: string, type?: PopupType, title?: string, onClose?: () => void) => void;
  hidePopup: () => void;
}

export const usePopup = create<PopupState>((set) => ({
  isOpen: false,
  message: "",
  title: "",
  type: "info",
  onClose: undefined,
  showPopup: (message, type = "info", title = "", onClose) =>
    set({ isOpen: true, message, type, title, onClose }),
  hidePopup: () =>
    set((state) => {
      state.onClose?.();
      return { isOpen: false, message: "", title: "", onClose: undefined };
    }),
}));
