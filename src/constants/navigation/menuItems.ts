import { SvgIconComponent } from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import { applicationItems } from "./applicationItems";

export interface MenuItem {
	id: string;
	title: string;
	type: string;
	caption?: string;
	url?: string;
	icon?: SvgIconComponent;
	target?: true;
	disabled?: boolean;
	children?: MenuItem[];
}

export const dashboardMenu = {
	items: [applicationItems],
};
