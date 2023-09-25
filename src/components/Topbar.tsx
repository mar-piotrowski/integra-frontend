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

interface TopbarProps {
	sidebarToggle: boolean;
	sidebarSetToggle: () => void;
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

const Topbar = ({ sidebarToggle, sidebarSetToggle }: TopbarProps) => {
	const theme = useTheme();
	const response = useMediaQuery(theme.breakpoints.down("md"));
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

					<AccountDropdown />
				</Box>
			</Toolbar>
		</AppBar>
	);
};
export default Topbar;
