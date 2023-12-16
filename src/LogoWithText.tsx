import { Box } from "@mui/system";
import React from "react";
import Logo from "./assets/Logo";
import {Typography, useTheme} from "@mui/material";

const LogoWithText = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
            }}
        >
            <Logo width={40} height={40}/>
            <Typography
                variant="h3"
                fontSize={24}
                sx={{
                    color: theme.palette.primary.dark,
                }}
            >
                INTEGRA
            </Typography>
        </Box>
    )
}

export default LogoWithText;