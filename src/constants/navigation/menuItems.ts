import { SvgIconComponent } from "@mui/icons-material";
import { managementNavItems } from "./managementNavItems";

export interface MenuItem {
	id: string;
	title: string;
	type: string;
	caption?: string;
	url?: string;
	icon?: SvgIconComponent;
	target?: true;
	disabled?: boolean;
	permissions: number[];
	children?: MenuItem[];
}

export const dashboardMenu = {
	management: [managementNavItems],
};
