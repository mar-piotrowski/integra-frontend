import {Outlet} from "react-router-dom";
import {
    Box,
    CssBaseline,
    styled,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import TopBar from "../components/TopBar";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {set} from "../store/sidebarSlice";
import {employeePanelNavItems} from "../constants/navigation/employeePanelNavItems";
import {managementNavItems} from "../constants/navigation/managementNavItems";

const drawerWidth = 300;

interface MainProps {
    open?: boolean;
    mdsize?: boolean;
}

const Main = styled("main")<MainProps>(({theme, open, mdsize}) => ({
    ...theme.typography.mainContent,
    flexGrow: 1,
    marginLeft: mdsize ? 0 : `-${drawerWidth}px`,
    borderTopLeftRadius: mdsize || !open ? 0 : "20px",
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
    [theme.breakpoints.up("md")]: {
        marginLeft: open ? 0 : -drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.down("md")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        padding: "16px",
    },
    [theme.breakpoints.down("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
    },
}));

export type PanelType = "employee" | "management";

interface MainLayoutProps {
    type: PanelType;
}

const MainLayout = ({type}: MainLayoutProps) => {
    const theme = useTheme();
    const sidebarSlice = useSelector((state: RootState) => state.sidebar);
    const dispatch = useDispatch();
    const responsive = useMediaQuery(theme.breakpoints.down("md"));

    const sidebarHandler = () => dispatch(set(!sidebarSlice.isOpen));

    const chooseMenuItems = () => {
        if(type == "employee")
            return employeePanelNavItems;
        return managementNavItems;
    }

    return (
        <Box
            sx={{
                display: "flex",
            }}
        >
            <CssBaseline/>
            <Sidebar
                toggle={responsive ? !sidebarSlice.isOpen : sidebarSlice.isOpen}
                setToggle={sidebarHandler}
                items={chooseMenuItems()}
            />
            <TopBar
                sidebarToggle={sidebarSlice.isOpen}
                sidebarSetToggle={sidebarHandler}
                type={type}
            />
            <Main theme={theme} open={sidebarSlice.isOpen} mdsize={responsive}>
                <Outlet/>
            </Main>
        </Box>
    );
};

export default MainLayout;
