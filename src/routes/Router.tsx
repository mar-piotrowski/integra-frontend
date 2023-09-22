import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import UserDashboardMain from "../pages/dashboard-user/UserDashboardMain";
import DashboardLayout from "../layouts/DashboardLayout";
import MainPage from "../pages/main/MainPage";
import NotFoundPage from "../pages/NotFoundPage";
import AccountLayout from "../layouts/AccountLayout";
import UserProfile from "../pages/dashboard-admin/account/UserProfile";
import UserPrivacy from "../pages/dashboard-admin/account/UserPrivacy";
import ListEmployee from "../pages/dashboard-admin/employee/ListEmployee";
import React from "react";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<MainPage />} />
			<Route path="management-panel" element={<DashboardLayout />}>
				<Route path="account" element={<AccountLayout />}>
					<Route path="profile" element={<UserProfile />} />
					<Route path="privacy" element={<UserPrivacy />} />
				</Route>
				<Route path="employees" element={<ListEmployee />} />
				<Route path="employee-panel" element={<UserDashboardMain />}></Route>
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</>
	)
);

export default router;
