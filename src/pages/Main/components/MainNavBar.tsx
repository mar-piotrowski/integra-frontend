import { AppBar, Box, Button, Drawer, Toolbar, Typography, useMediaQuery } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useTheme } from "@emotion/react"
import CustomButton from "./CustomButton";
import LogoWithText from "../../../LogoWithText";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";

const MainNavBar = () => {
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const responsive = useMediaQuery(theme.breakpoints.down("sm"));
    const navigate = useNavigate();

    useEffect(() => {
        if (!responsive && mobileOpen)
            setMobileOpen(false);
    }, [responsive, mobileOpen])

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    const navigationButtons = [
        <CustomButton textColor="black" text="O nas" />,
        <CustomButton textColor="black" text="Produkty" />,
        <CustomButton textColor="black" text="Cennik" />,
        <CustomButton text="Logowanie" onClick={() => navigate("/choose-login")} />,
        <CustomButton variant="contained" text="Rejestracja" onClick={() => navigate("/register")} />
    ];

    return (
        <>
            <AppBar
                component="nav"
                position="fixed"
                color="inherit"
                elevation={0}
            >
                <Toolbar sx={{
                    display: "flex",
                    justifyContent: "space-around"
                }}>
                    <LogoWithText />
                    {responsive
                        ? <MenuOutlinedIcon
                            onClick={handleDrawerToggle}
                            sx={{ cursor: "pointer" }} />
                        : <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2
                        }}>
                            {navigationButtons}
                        </Box>}
                </Toolbar>
            </AppBar>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{ position: "relative", display: { xs: 'block', sm: 'none' } }}
            >
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    paddingY: 5,
                    paddingX: 8
                }}>
                    {navigationButtons}
                </Box>
                <CloseIcon
                    onClick={handleDrawerToggle}
                    sx={{
                        position: "absolute",
                        cursor: "pointer",
                        top: 10,
                        right: 10
                    }}
                />
            </Drawer>
        </>
    )
}

export default MainNavBar;