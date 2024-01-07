import { Box, useTheme } from "@mui/material";
import React from "react";

interface PanelImageProps {
    image: string;
}

const PanelImage = ({ image }: PanelImageProps) => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                borderRadius: 4,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme.palette.grey[200],
                width: "600px"
            }}
        >
            <img src={image} />
        </Box>
    );
};

export default PanelImage;