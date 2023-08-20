/* eslint-disable react-refresh/only-export-components */
import { IconType } from "react-icons";
import { BiHomeAlt } from "react-icons/bi";
import { LiaWarehouseSolid, LiaFileInvoiceSolid } from "react-icons/lia";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlinePayments, MdOutlineAccountBalance } from "react-icons/md";

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

export const dropdownEmployee: NavigationItemDropdown[] = [
	{
		name: "Lista pracowników",
		to: "/employees",
	},
	{
		name: "Urlopy",
		to: "/employees/holidays",
	},
	{
		name: "Grafik",
		to: "/employees/schedule",
	},
	{
		name: "Szkolenia",
		to: "/employees/courses",
	},
];

export const sidebarAdminMenu: NavigationItem[] = [
	{
		icon: BiHomeAlt,
		name: "Panel",
		to: "/dashboard",
	},
	{
		icon: AiOutlineUser,
		name: "Pracownicy",
		dropdown: dropdownEmployee,
	},
	{
		icon: LiaWarehouseSolid,
		name: "Magazyn",
		to: "/warehouse",
	},
	{
		icon: LiaFileInvoiceSolid,
		name: "Faktury",
		to: "/invoice",
	},
	{
		icon: MdOutlineAccountBalance,
		name: "Księgowość",
		to: "/accoouting",
	},
	{
		icon: MdOutlinePayments,
		name: "Płatności",
		to: "/payments",
	},
];

// export const SidebarUserNavigation: SidebarNavigation[] = [
// 	{
// 		categoryName: "Menu",
// 		items: [
// 			{
// 				name: "Panel",
// 				to: "/dashboard",
// 			},
// 			{
// 				name: "Projekty",
// 				to: "/projects",
// 			},
// 			{
// 				name: "Grafik",
// 				to: "/schedule",
// 			},
// 			{
// 				name: "Urlopy",
// 				to: "/holidays",
// 			},
// 			{
// 				name: "Szkolenia",
// 				to: "/courses",
// 			},
// 		],
// 	},
// ];
