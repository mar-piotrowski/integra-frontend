import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface SidebarState {
	isOpen: boolean;
}

const initialState: SidebarState = {
	isOpen: true,
};

export const sidebarSlice = createSlice({
	name: "sidabar",
	initialState,
	reducers: {
		open: (state) => {
			state.isOpen = true;
		},
		close: (state) => {
			state.isOpen = false;
		},
		set: (state, action: PayloadAction<boolean>) => {
			state.isOpen = action.payload;
		},
	},
});

export const { open, close, set } = sidebarSlice.actions;
export default sidebarSlice.reducer;
