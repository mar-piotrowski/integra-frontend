import { NavLink } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";

const ButtonLogout = () => {
	return (
		<NavLink
			to={"/logout"}
			className="flex items-center justify-center gap-2 p-2 rounded bg-background text-fontColor hover:bg-primary-500 hover:text-white dark:bg-dark-background-darker dark:text-dark-font-color"
		>
			<TbLogout2 />
			<div className="text-sm font-medium">Wyloguj</div>
		</NavLink>
	);
};

export default ButtonLogout;
