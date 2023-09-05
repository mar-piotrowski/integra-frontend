import { NavLink } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";

const SidebarLogout = () => {
	return (
		<NavLink
			to={"/logout"}
			className="flex items-center justify-center gap-2 p-2 transition rounded bg-default-background text-default-text hover:bg-primary-500 hover:text-default-white"
		>
			<TbLogout2 />
			<div className="text-sm font-medium">Wyloguj</div>
		</NavLink>
	);
};

export default SidebarLogout;
