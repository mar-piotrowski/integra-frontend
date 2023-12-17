import { Grid, Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

interface ProfilePresentationProps {
    name: string;
    position: string;
}

const ProfilePresentation = ({ name, position }: ProfilePresentationProps) => {
    return (
        <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar sx={{ width: 80, height: 80 }} />
                <Box sx={{ marginLeft: "20px" }}>
                    <Typography variant="h3">{name}</Typography>
                    <Typography variant="subtitle1">{position}</Typography>
                </Box>
            </Box>
        </Grid>
    )
}

export default ProfilePresentation;