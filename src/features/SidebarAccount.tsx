import { NavLinkItem } from "../Constants";
import SidebarButtonContent from "../components/SidebarButtonContent";

const navigationItems: NavLinkItem[] = [
	{
		name: "Profil",
		to: "/management-panel/account/profile",
	},
	{
		name: "Prywatność",
		to: "/management-panel/account/privacy",
	},
];

const SidebarAccount = () => {
	const renderedItems = navigationItems.map((item, index) => (
		<SidebarButtonContent key={index} name={item.name} to={item.to} />
	));
	return <nav className="flex flex-col gap-3">{renderedItems}</nav>;
};

export default SidebarAccount;
