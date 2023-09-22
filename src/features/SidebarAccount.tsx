import { NavLinkItem } from "../Constants";
import ButtonSidebarContent from "../components/buttons/ButtonSidebarContent";

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
		<ButtonSidebarContent key={index} name={item.name} to={item.to} />
	));
	return <nav className="flex flex-col gap-3">{renderedItems}</nav>;
};

export default SidebarAccount;
