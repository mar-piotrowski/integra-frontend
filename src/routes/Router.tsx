import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import AdminDashboardMain from "../pages/dashboard-admin/AdminDashboardMain";
import UserDashboardMain from "../pages/dashboard-user/UserDashboardMain";
import DashboardLayout from "../layouts/DashboardLayout";
import MainPage from "../pages/Main/MainPage";
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<MainPage />} />
			<Route path="dashboard" element={<DashboardLayout />}>
				<Route path="admin" element={<AdminDashboardMain />}></Route>
				<Route path="user" element={<UserDashboardMain />}></Route>
			</Route>
			<Route path="*" element={<NotFoundPage />} />
		</>
	)
);

export default router;
