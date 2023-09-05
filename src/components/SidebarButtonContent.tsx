import { NavLink } from "react-router-dom";

interface SidebarButtonContentProps {
	name: string;
	to: string;
}

const SidebarButtonContent = ({ name, to }: SidebarButtonContentProps) => {
	return (
		<NavLink
			className={({ isActive }) =>
				isActive
					? "bg-primary-200 text-primary-600 py-2 px-4 rounded-xl font-medium text-center transition-colors"
					: "text-default-text p-2 rounded-xl text-center hover:bg-primary-200 hover:text-primary-600 transition-colors py-2 px-4"
			}
			to={to}
		>
			{name}
		</NavLink>
	);
};

export default SidebarButtonContent;
