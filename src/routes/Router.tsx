import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
} from "react-router-dom";
import MainPage from "../pages/Main/MainPage";
import AdminDashboardMain from "../pages/AdminDashboard/AdminDashboardMain";
import UserDashboardMain from "../pages/UserDashboard/UserDashboardMain";
import DashboardLayout from "../layouts/DashboardLayout";

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<MainPage />} />
			<Route path="dashboard" element={<DashboardLayout />}>
				<Route path="admin" element={<AdminDashboardMain />}></Route>
				<Route path="user" element={<UserDashboardMain />}></Route>
			</Route>
		</>
	)
);

export default router;
