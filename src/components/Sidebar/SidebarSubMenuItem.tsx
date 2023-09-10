import { NavLink } from "react-router-dom";

interface SidebarSubMenuItemProps {
	to: string;
	text: string;
}

const SidebarSubMenuItem = ({ to, text }: SidebarSubMenuItemProps) => {
	const unactive = "p-2 mx-1 text-sm hover:bg-gray-100 bg-background";
	const active = "p-2 mx-1 text-sm hover:bg-gray-100 bg-gray-100";
	return (
		<NavLink
			to={to}
			className={({ isActive }) => (isActive ? active : unactive)}
		>
			{text}
		</NavLink>
	);
};

export default SidebarSubMenuItem;
