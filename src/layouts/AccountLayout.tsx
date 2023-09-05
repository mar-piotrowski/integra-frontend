import { Outlet } from "react-router-dom";
import ContentFlexLayout from "./ContentFlexLayout";
import SidebarAccount from "../features/SidebarAccount";

const AccountLayout = () => {
	return (
		<ContentFlexLayout>
			<SidebarAccount />
			<div className="px-6 py-2">
				<Outlet />
			</div>
		</ContentFlexLayout>
	);
};

export default AccountLayout;
