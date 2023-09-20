import { Outlet } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";

const DashboardLayout = () => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				display: "flex",
				width: 1,
			}}
		>
			<Sidebar />
			<Box
				component="main"
				sx={{
					backgroundColor: "#f8fafc",
					flexGrow: 1,
					p: 2,
				}}
			>
				<Topbar />
				<Outlet />
			</Box>
		</Box>
	);
};

export default DashboardLayout;
