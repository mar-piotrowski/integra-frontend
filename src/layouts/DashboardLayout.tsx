import { Outlet } from "react-router-dom";
import { useContext } from "react";
import SidebarContext, { SidebarContextType } from "../context/SidebarContext";
import Topbar from "../components/Topbar";
import SidebarAdmin from "../features/SidebarAdmin";

const DashboardLayout = () => {
	const { isOpen } = useContext(SidebarContext) as SidebarContextType;

	return (
		<main className="flex min-h-screen">
			<SidebarAdmin />
			<section
				className={`w-full p-6 transition-[margin] bg-background dark:bg-dark-background-darker ${
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
