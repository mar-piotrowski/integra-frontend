import { Box, Typography } from "@mui/material";
import React from "react";

type DescriptionVariant = "column" | "line";

interface DescriptionProps {
    variant: DescriptionVariant;
    title: string;
    value: any;
}

const Description = ({ title, value, variant }: DescriptionProps) => {
    return (
        <>
            {
                variant == "column"
                    ? <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "2px"
                        }}
                    >
                        <Typography variant="subtitle2">{title}</Typography>
                        <Typography variant="subtitle1">{value}</Typography>
                    </Box>
                    : <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="subtitle1">{title}</Typography>
                        <Typography variant="body1">{value}</Typography>
                    </Box>
            }
        </>
    )
}

export default Description;