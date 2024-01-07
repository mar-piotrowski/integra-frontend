import { Grid } from "@mui/material";
import React from "react";
import WelcomeBanner from "./WelcomeBanner";
import WelcomeBannerDescription from "./WelcomeBannerDescription";

const WelcomeSection = () => {
    return (
        <Grid container xs={12}>
            <Grid item xs={12}>
                <WelcomeBanner />
            </Grid>
            <Grid item xs={12}>
                <WelcomeBannerDescription />
            </Grid>
        </Grid>
    );
};

export default WelcomeSection;