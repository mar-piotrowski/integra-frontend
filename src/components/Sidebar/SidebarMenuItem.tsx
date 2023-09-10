import { NavLink } from "react-router-dom";
import { IconType } from "react-icons";

type SidebarDefaultItemProps = {
	icon?: IconType;
	text: string;
	to: string;
	children?: JSX.Element | JSX.Element[];
};

const SidebarMenuItem = ({
	icon,
	text,
	to,
	children,
}: SidebarDefaultItemProps) => {
	const Icon = icon;
	const mainStyle =
		"flex items-center w-[250px] justify-between py-2 px-3 mt-2 rounded cursor-pointer text-fontColor dark:text-dark-font-color";
	const inActive = mainStyle + " hover:bg-primary-500 hover:text-white";
	const active = mainStyle + " bg-primary-600 text-white";
	return (
		<>
			<NavLink
				to={to}
				className={({ isActive }) => (isActive ? active : inActive)}
			>
				<div className="flex items-center gap-3">
					{icon != null ? <Icon className="text-lg" /> : null}
					<div className="font-medium">{text}</div>
				</div>
			</NavLink>
			<div>{children != null ? children : null}</div>
		</>
	);
};

export default SidebarMenuItem;
