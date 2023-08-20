import { AiOutlineUser } from "react-icons/ai";
import { BiHomeAlt } from "react-icons/bi";
import { LiaWarehouseSolid, LiaFileInvoiceSolid } from "react-icons/lia";
import { MdOutlineAccountBalance, MdOutlinePayments } from "react-icons/md";
import { NavigationItemDropdown, NavigationItem } from "../Constants";
import Sidebar from "../components/sidebar/Sidebar";
import SidebarNavigationItem from "../components/sidebar/SidebarNavigationItem";

const dropdownEmployee: NavigationItemDropdown[] = [
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

const menuItems: NavigationItem[] = [
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

const SidebarAdmin = () => {
	const renderedMenuItems = menuItems.map((item) => (
		<SidebarNavigationItem {...item} />
	));
	return (
		<Sidebar>
			<div>
				<div className="text-sm ">Menu</div>
				{renderedMenuItems}
			</div>
		</Sidebar>
	);
};

export default SidebarAdmin;
