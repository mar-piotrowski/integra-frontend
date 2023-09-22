import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CollapseMenuState {
	collapaseMenus: string[];
}

const initialState: CollapseMenuState = {
	collapaseMenus: [],
};

export const collapaseMenuSlice = createSlice({
	name: "collapseMenus",
	initialState,
	reducers: {
		add: (state, action: PayloadAction<string>) => {
			state.collapaseMenus = [...state.collapaseMenus, action.payload];
		},
		remove: (state, action: PayloadAction<string>) => {
			state.collapaseMenus = state.collapaseMenus.filter(
				(item) => item != action.payload
			);
		},
	},
});

export const { add, remove } = collapaseMenuSlice.actions;
export default collapaseMenuSlice.reducer;
