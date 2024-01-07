import { IconType } from "react-icons";

/* eslint-disable react-refresh/only-export-components */
export type NavigationItem = {
	icon?: IconType;
	name: string;
	to?: string;
	dropdown?: NavigationItemDropdown[];
};

export type NavigationItemDropdown = {
	name: string;
	to: string;
};

export interface NavLinkItem {
	name: string;
	to: string;
}