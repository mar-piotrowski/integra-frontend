import { Box, Drawer, Toolbar, Typography, useTheme } from "@mui/material";

import NavGroup from "./NavGroup";
import React from "react";
import { dashboardMenu } from "../../constants/navigation/menuItems";
import Logo from "../../assets/Logo";

const Sidebar = () => {
	const theme = useTheme();
	const drawerWidth = 250;

	return (
		<Box
			component="nav"
			sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, p: 2 }}
			aria-label="mailbox folders"
		>
			<Drawer
				variant="permanent"
				sx={{
					display: { xs: "none", sm: "block" },
					"& .MuiDrawer-paper": {
						boxSizing: "border-box",
						width: drawerWidth,
						padding: 2,
						border: "none",
					},
				}}
				open
			>
				<Toolbar
					sx={{
						display: "flex",
						justifyContent: "center",
						gap: "10px",
					}}
				>
					<Logo width={30} height={30} />
					<Typography
						variant="h3"
						fontSize={24}
						sx={{
							color: theme.palette.primary.dark,
						}}
					>
						INTEGRA
					</Typography>
				</Toolbar>
				<NavGroup item={dashboardMenu.items[0]} />
			</Drawer>
		</Box>
	);
};

export default Sidebar;
