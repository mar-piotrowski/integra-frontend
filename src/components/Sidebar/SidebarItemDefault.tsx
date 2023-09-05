import { NavLink } from "react-router-dom";
import { IconType } from "react-icons";

type SidebarDefaultItemProps = {
	icon: IconType;
	name: string;
	to: string;
};

const SidebarItemDefault = ({ icon, name, to }: SidebarDefaultItemProps) => {
	const Icon = icon;
	const mainStyle =
		"flex items-center w-[250px] justify-between py-2 px-3 mt-2 rounded cursor-pointer text-default-text";
	const inActive = mainStyle + " hover:bg-primary-600 hover:text-default-white";
	const active = mainStyle + " bg-primary-600 text-default-white";
	return (
		<NavLink
			to={to}
			className={({ isActive }) => (isActive ? active : inActive)}
		>
			<div className="flex items-center gap-3">
				<Icon className="text-lg" />
				<div className="font-medium">{name}</div>
			</div>
		</NavLink>
	);
};

export default SidebarItemDefault;
