import { NavLink } from "react-router-dom";

type SidebarDropdownProps = {
	name: string;
	to: string;
};

const SidebarDropdownItem = ({ name, to }: SidebarDropdownProps) => {
	const mainStyle = "p-2 text-sm cursor-pointer";
	const active = mainStyle + "bg-normal";
	return (
		<NavLink
			to={to}
			className={({ isActive }) => (isActive ? active : mainStyle)}
		>
			{name}
		</NavLink>
	);
};

export default SidebarDropdownItem;
