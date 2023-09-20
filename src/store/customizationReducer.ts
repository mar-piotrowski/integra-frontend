interface CustomizationReducerState {
	collapseMenusOpen: string[];
	sidebarOpen: boolean;
}

export enum CustomizationActionKind {
	MENU_TOGGLE,
	MENU_OPEN,
	SET_MENU,
}

interface CustomizationAction {
	type: CustomizationActionKind;
	payload: string;
}

const initialState: CustomizationReducerState = {
	collapseMenusOpen: [],
	sidebarOpen: true,
};

const customizationReducer = (
	state: CustomizationReducerState = initialState,
	action: CustomizationAction
) => {
	const { type, payload: id } = action;
	switch (type) {
		case CustomizationActionKind.MENU_OPEN:
			return {
				...state,
				isOpen: [id],
			};
		case CustomizationActionKind.SET_MENU:
			return {
				...state,
			};
		case CustomizationActionKind.MENU_TOGGLE:
			return {
				...state,
			};
		default:
			return state;
	}
};

export default customizationReducer;
