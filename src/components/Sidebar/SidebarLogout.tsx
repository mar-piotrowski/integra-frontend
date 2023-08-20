import { NavLink } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";

const SidebarLogout = () => {
	return (
		<NavLink
			to={"/logout"}
			className="flex items-center justify-center gap-2 p-2 transition rounded bg-gray-normal hover:bg-primary-normal hover:text-white"
		>
			<TbLogout2 />
			<div className="text-sm font-medium">Wyloguj</div>
		</NavLink>
	);
};

export default SidebarLogout;
