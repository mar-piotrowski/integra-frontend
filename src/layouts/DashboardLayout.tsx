import { Outlet } from "react-router-dom";
import { useContext } from "react";
import SidebarContext, { SidebarContextType } from "../context/SidebarContext";
import SidebarAdmin from "../features/SidebarAdmin";
import Topbar from "../components/Topbar";

const DashboardLayout = () => {
	const { isOpen } = useContext(SidebarContext) as SidebarContextType;

	return (
		<main className="flex h-full">
			<SidebarAdmin />
			<section
				className={`w-full p-4 transition-[margin] bg-default-background ${
					isOpen ? "ml-content" : ""
				}`}
			>
				<Topbar />
				<Outlet />
			</section>
		</main>
	);
};

export default DashboardLayout;
