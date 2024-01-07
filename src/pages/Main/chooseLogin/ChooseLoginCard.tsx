import { SvgIconComponent } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ChooseLoginCardProps {
    icon: SvgIconComponent;
    title: string;
    to: string;
}

const ChooseLoginCard = ({ icon, title, to }: ChooseLoginCardProps) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const Icon = icon;

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                backgroundColor: theme.palette.grey[200],
                padding: 6,
                borderRadius: 4,
                width: "250px",
                height: "120px",
                cursor: "pointer",
                "&:hover": {
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    transition: "ease-in",
                    transitionDuration: "200ms"
                }
            }}
            onClick={() => navigate(to)}
        >
            <Icon />
            <Typography variant={"body1"} fontSize={"large"}>{title}</Typography>
        </Box>
    );
};

export default ChooseLoginCard;