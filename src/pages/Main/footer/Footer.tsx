import { Box, Divider, Grid, Typography, useTheme } from "@mui/material";
import React from "react";

const Footer = () => {
    const theme = useTheme();
    return (
        <Grid
            container
            px={10}
            py={3}
            sx={{
                backgroundColor: theme.palette.primary.dark,
            }}
        >
            <Grid item sm={6} mb={4}>
                <Typography variant="h3" color={"white"}>INTEGRA</Typography>
            </Grid>
            <Grid item container sm={6} spacing={4} mb={10}>
                <Grid
                    item
                    container
                    direction={"column"}
                    spacing={2}
                    xs={6}
                    sm={4}
                    sx={{ color: "white" }}
                >
                    <Grid item>
                        <Typography variant="h4" color={"white"}>O nas</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">Misja i wartości</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">Nagrody i wyróżnienia</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">Partnerstwo</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">Kariera</Typography>
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    direction={"column"}
                    spacing={2}
                    xs={6}
                    sm={4}
                    sx={{ color: "white" }}
                >
                    <Grid item>
                        <Typography variant="h4" color={"white"}>Cennik</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">Pakiety</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">Usługi</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">Promocje</Typography>
                    </Grid>
                </Grid>
                <Grid item container direction={"column"} spacing={2} sm={4} sx={{ color: "white" }}>
                    <Grid item>
                        <Typography variant="h4" color={"white"}>Kontakt</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">Pomoc techniczna</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">FAQ</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">Lokalizacja</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} my={1}>
                <Divider />
            </Grid>
            <Grid item xs={12}>
                <Typography
                    variant="subtitle2"
                    textAlign={"center"}
                    color={theme.palette.grey[50]}
                >
                    Copyright @2023 CostamHRM. All Rights Reserved
                </Typography>
            </Grid>
        </Grid>
    );
};

export default Footer;