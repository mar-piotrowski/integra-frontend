import { Outlet } from "react-router-dom";
import ContentLayout from "./ContentLayout";
import SidebarAccount from "../features/SidebarAccount";

const AccountLayout = () => {
	return (
		<ContentLayout>
			<SidebarAccount />
			<div className="px-6 py-2 ">
				<Outlet />
			</div>
		</ContentLayout>
	);
};

export default AccountLayout;
