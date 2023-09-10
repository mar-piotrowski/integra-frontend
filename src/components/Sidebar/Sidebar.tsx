import { useContext } from "react";
import Logo from "../../assets/Logo";
import SidebarContext, {
	SidebarContextType,
} from "../../context/SidebarContext";
import ButtonLogout from "../buttons/ButtonLogout";

type SidebarProps = {
	children: JSX.Element | JSX.Element[];
};

const Sidebar = ({ children }: SidebarProps) => {
	const { isOpen } = useContext(SidebarContext) as SidebarContextType;

	return (
		<div
			className={`fixed left-0 top-0 flex z-1 flex-col justify-between h-full p-6 transition-[transform] dark:bg-dark-background-ligher ${
				!isOpen ? "-translate-x-full" : ""
			}`}
		>
			<div>
				<div className="flex items-center justify-center gap-2 p-5 mb-5">
					<Logo height={35} width={35} />
					<div className="text-2xl font-bold text-primary-600">INTEGRA</div>
				</div>
				{children}
			</div>
			<ButtonLogout />
		</div>
	);
};

export default Sidebar;
