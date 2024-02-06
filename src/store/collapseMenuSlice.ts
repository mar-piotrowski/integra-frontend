import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CollapseMenuState {
	collapseMenus: string[];
}

const initialState: CollapseMenuState = {
	collapseMenus: [],
};

export const collapseMenuSlice = createSlice({
	name: "collapseMenus",
	initialState,
	reducers: {
		add: (state, action: PayloadAction<string>) => {
			state.collapseMenus = [...state.collapseMenus, action.payload];
		},
		remove: (state, action: PayloadAction<string>) => {
			state.collapseMenus = state.collapseMenus.filter(
				(item) => item != action.payload
			);
		},
	},
});

export const { add, remove } = collapseMenuSlice.actions;
export default collapseMenuSlice.reducer;
