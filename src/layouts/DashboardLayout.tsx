import { Outlet } from "react-router-dom";
import {
	Box,
	CssBaseline,
	styled,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { set } from "../store/sidebarSlice";

const drawerWidth = 280;

interface MainProps {
	open?: boolean;
	mdSize?: boolean;
}

const Main = styled("main")<MainProps>(({ theme, open, mdSize }) => ({
	...theme.typography.mainContent,
	flexGrow: 1,
	marginLeft: mdSize ? 0 : `-${drawerWidth}px`,
	borderTopLeftRadius: mdSize || !open ? 0 : "20px",
	transition: theme.transitions.create(["margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		transition: theme.transitions.create(["margin"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	}),
}));

const DashboardLayout = () => {
	const theme = useTheme();
	const sidebarSlice = useSelector((state: RootState) => state.sidebar);
	const dispatch = useDispatch();
	const responsive = useMediaQuery(theme.breakpoints.down("md"));

	const sidebarHandler = () => dispatch(set(!sidebarSlice.isOpen));

	return (
		<Box
			sx={{
				display: "flex",
			}}
		>
			<CssBaseline />
			<Sidebar
				toggle={responsive ? !sidebarSlice.isOpen : sidebarSlice.isOpen}
				setToggle={sidebarHandler}
			/>
			<Topbar
				sidebarToggle={sidebarSlice.isOpen}
				sidebarSetToggle={sidebarHandler}
			/>
			<Main theme={theme} open={sidebarSlice.isOpen} mdSize={responsive}>
				<Outlet />
			</Main>
		</Box>
	);
};

export default DashboardLayout;
