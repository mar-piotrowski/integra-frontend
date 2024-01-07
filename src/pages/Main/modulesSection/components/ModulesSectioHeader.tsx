import { Grid, Typography, useTheme } from "@mui/material";
import React from "react";

const ModulesSectionHeader = () => {
    const theme = useTheme();

    return (
        <Grid
            container
            xs={11}
            md={10}
            lg={7}
            spacing={1}
            sx={{
                backgroundColor: theme.palette.grey[200],
                borderBottomRightRadius: "100px",
                borderTopRightRadius: 10,
                paddingY: 8,
                paddingX: 10
            }}
        >
            <Grid item xs={12}>
                <Typography variant="h3">
                    Dopasuj moduły którę odpowiadają twojej firmie
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h3" color="primary">
                    To takie proste!
                </Typography>
            </Grid>
            <Grid item>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliqnulla p
                Excepteur sint occaecat cupidatat non
            </Grid>
        </Grid>
    );
};

export default ModulesSectionHeader;