import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface HeaderActionsProps {
    title: string;
    children: JSX.Element | JSX.Element[];
}

const HeaderAction = ({ title, children }: HeaderActionsProps) => {
    return (
        <Box sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        }}>
            <Typography variant="h4">{title}</Typography>
            <Box>
                {children}
            </Box>
        </Box>
    );
};

export default HeaderAction