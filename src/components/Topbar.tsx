import {
	Box,
	AppBar,
	Toolbar,
	IconButton,
	Typography,
	useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountDropdown from "./AccountDropdown";
import React from "react";

const Topbar = () => {
	const theme = useTheme();
	return (
		<Box>
			<AppBar
				position="static"
				sx={{
					backgroundColor: "white",
					borderRadius: 2,
					color: "black",
					boxShadow: "none",
				}}
			>
				<Toolbar>
					<Box sx={{ flexGrow: 1 }}>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2 }}
						>
							<MenuIcon sx={{ color: theme.palette.background }} />
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
		</Box>
	);
};
export default Topbar;
