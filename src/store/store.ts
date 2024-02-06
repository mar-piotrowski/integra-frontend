import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./sidebarSlice";
import collapseMenuSlice from "./collapseMenuSlice";

export const store = configureStore({
	reducer: {
		sidebar: sidebarSlice,
		collapseMenus: collapseMenuSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
