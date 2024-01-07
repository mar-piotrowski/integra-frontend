import { SvgIconComponent } from "@mui/icons-material";
import { Grid, Typography, useTheme } from "@mui/material";
import React from "react";

interface ModuleProps {
    icon: SvgIconComponent;
    title: string;
    description: string;
}

const ModuleCard = ({ icon, title, description }: ModuleProps) => {
    const theme = useTheme();
    const Icon = icon;
    return (
        <Grid
            container
            xs={12}
            justifyContent={"center"}
            alignItems={"center"}
            sx={{
                backgroundColor: theme.palette.grey[200],
                width: "300px",
                height: "200px",
                padding: 3,
                borderRadius: 4
            }}
        >
            <Grid
                item
                container
                justifyContent={"center"}
                alignItems={"center"}
                spacing={1}
            >
                <Grid item>
                    <Icon fontSize="large" />
                </Grid>
                <Grid item>
                    <Typography variant="h3" color="primary">
                        {title}
                    </Typography>
                </Grid>
            </Grid>
            <Grid item>
                {description}
            </Grid>
        </Grid>
    )
};

export default ModuleCard;