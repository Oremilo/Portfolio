import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants/index";

const useWindowStore = create(
    immer((set) => ({
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,

        openWindow: (windowKey, data = null) =>
            set((state) => {
                const win = state.windows[windowKey];
                if (!win) return;

                if (win.isMinimized) {
                    win.isMinimized = false;
                    win.zIndex = state.nextZIndex++;
                    return;
                }

                win.isOpen = true;
                win.zIndex = state.nextZIndex;
                win.data = data ?? win.data;
                win.isMaximized = false;
                win.isMinimized = false;
                state.nextZIndex++;
            }),

        closeWindow: (windowKey) =>
            set((state) => {
                const win = state.windows[windowKey];
                win.isOpen = false;
                win.isMinimized = false;
                win.isMaximized = false;
                win.zIndex = INITIAL_Z_INDEX;
                win.data = null;
            }),


        focusWindow: (windowKey) =>
            set((state) => {
                const win = state.windows[windowKey];
                if (win.isMinimized) return;
                win.zIndex = state.nextZIndex++;
            }),
    })),
);

export default useWindowStore;
