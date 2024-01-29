import { Divider, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"

interface CustomModalHeaderProps {
    title: string;
}

const Header = ({ title }: CustomModalHeaderProps) => {
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginBottom: 2
        }}>
            <Typography variant="h3">{title}</Typography>
            <Divider />
        </Box>
    );
};

export default Header;