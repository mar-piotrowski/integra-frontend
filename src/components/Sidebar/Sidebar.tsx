import { useContext } from "react";

import SidebarLogout from "./SidebarLogout";
import Logo from "../../assets/Logo";
import SidebarContext, {
	SidebarContextType,
} from "../../context/SidebarContext";

type SidebarProps = {
	children: JSX.Element | JSX.Element[];
};

const Sidebar = ({ children }: SidebarProps) => {
	const { isOpen } = useContext(SidebarContext) as SidebarContextType;

	return (
		<div
			className={`fixed left-0 top-0 flex z-1 flex-col justify-between h-full p-6 bg-white transition-[transform] ${
				!isOpen ? "-translate-x-full" : ""
			}`}
		>
			<div>
				<div className="flex items-center justify-center gap-2 p-5 mb-5">
					<Logo height={35} width={35} />
					<div className="text-2xl font-bold text-primary-normal">INTEGRA</div>
				</div>
				{children}
			</div>
			<SidebarLogout />
		</div>
	);
};

export default Sidebar;
