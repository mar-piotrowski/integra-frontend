import {
	Box,
	Drawer,
	Toolbar,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";

import NavGroup from "./NavGroup";
import React from "react";
import { MenuItem } from "../../constants/navigation/menuItems";
import Logo from "../../assets/Logo";

interface SidebarProps {
	toggle: boolean;
	setToggle: () => void;
	items: MenuItem;
}

const Sidebar = ({ toggle, setToggle, items }: SidebarProps) => {
	const theme = useTheme();
	const responsive = useMediaQuery(theme.breakpoints.up("md"));
	const drawerWidth = 300;


	return (
		<Box component="nav">
			<Drawer
				// container={container}
				variant={responsive ? "persistent" : "temporary"}
				anchor="left"
				open={toggle}
				onClose={setToggle}
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						border: "none",
						padding: "20px",
						boxSizing: "border-box",
					},
				}}
				ModalProps={{ keepMounted: true }}
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
				<NavGroup item={items} />
			</Drawer>
		</Box>
	);
};

export default Sidebar;
