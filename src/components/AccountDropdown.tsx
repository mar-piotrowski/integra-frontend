import { Settings, Logout } from "@mui/icons-material";
import {
	Box,
	Tooltip,
	IconButton,
	Avatar,
	Menu,
	MenuItem,
	ListItemIcon,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { NavLink } from "react-router-dom";
import React from "react";

const AccountDropdown = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const open = Boolean(anchorEl);

	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					textAlign: "center",
				}}
			>
				<Tooltip title="Account settings">
					<IconButton
						onClick={handleClick}
						size="small"
						sx={{ ml: 2 }}
						aria-controls={open ? "account-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
					>
						<Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						borderRadius: "9px",
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.20))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<MenuItem onClick={handleClose}>
					<ListItemIcon
						sx={{
							color: "black",
						}}
					>
						<PersonIcon />
					</ListItemIcon>
					<NavLink to={"/profil"}>Profil</NavLink>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<ListItemIcon
						sx={{
							color: "black",
						}}
					>
						<Settings fontSize="small" />
					</ListItemIcon>
					Settings
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<ListItemIcon
						sx={{
							color: "black",
						}}
					>
						<Logout fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</>
	);
};

export default AccountDropdown;