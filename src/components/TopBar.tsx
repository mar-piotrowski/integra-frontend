import {
	Box,
	Toolbar,
	IconButton,
	Typography,
	useTheme,
	styled,
	useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountDropdown from "../features/AccountDropdown";
import React from "react";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {PanelType} from "../layouts/MainLayout";
import {
	managementPanelAccountDropdownItems, managementPanelEmployeeRedirectItem
} from "../constants/dropdown/managementPanelAccountDropdownItems";
import {
	employeePanelAccountDropdownItems,
	employeePanelManagementRedirectItem
} from "../constants/dropdown/employeePanelAccountDropdownItems";

interface TopBarProps {
	sidebarToggle: boolean;
	sidebarSetToggle: () => void;
	type: PanelType
}

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
	mdsize: boolean;
}
const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open, mdsize }: AppBarProps) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: mdsize ? "100%" : `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const TopBar = ({ sidebarToggle, sidebarSetToggle, type }: TopBarProps) => {
	const theme = useTheme();
	const response = useMediaQuery(theme.breakpoints.down("md"));

	const chooseAccountDropdownItems = () => {
		if(type == "employee"){
			const employeeItems = managementPanelAccountDropdownItems;
			if(employeeItems.find(item => item.title == "Panel zarzadzania") == null)
				employeeItems.push(employeePanelManagementRedirectItem);
			return employeeItems;
		}
		const managementItems = employeePanelAccountDropdownItems;
		if(managementItems.find(item => item.title == "Panel pracownika") == null)
			managementItems.push(managementPanelEmployeeRedirectItem);
		return managementItems;
	}

	return (
		<AppBar
			enableColorOnDark
			position="fixed"
			color="inherit"
			elevation={0}
			open={sidebarToggle}
			mdsize={response}
		>
			<Toolbar>
				<Box sx={{ flexGrow: 1 }}>
					<IconButton
						size="large"
						edge="start"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={sidebarSetToggle}
					>
						<MenuIcon />
					</IconButton>
				</Box>
				<Box
					sx={{
						display: " flex",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
						}}
					>
						<Typography variant="caption" fontWeight="bold">
							Marcin Piotrowski
						</Typography>
						<Typography variant="caption">Senior Engineer</Typography>
					</Box>
					<AccountDropdown items={chooseAccountDropdownItems()} />
				</Box>
			</Toolbar>
		</AppBar>
	);
};
export default TopBar;
