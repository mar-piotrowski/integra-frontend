import { Outlet } from "react-router-dom";
import { useContext } from "react";
import SidebarContext, { SidebarContextType } from "../context/SidebarContext";

const DashboardLayout = () => {
	const { isOpen } = useContext(SidebarContext) as SidebarContextType;

	return (
		<div className="flex h-full bg-gray-normal">
			<div
				className={`w-full p-5 transition-[margin] ${
					isOpen ? "ml-content" : ""
				}`}
			>
				<Outlet />
			</div>
		</div>
	);
};

export default DashboardLayout;
