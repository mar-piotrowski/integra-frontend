import TrustedCompanies from "./TrustedComapnies";
import React from "react";
import { Grid, Typography } from "@mui/material";

const TrustedCompaniesSection = () => {
    return (
        <Grid container xs={12}>
            <Grid item xs={12}>
                <Typography variant="h3" textAlign={"center"}>Przedsiębiorswta które nam zaufały</Typography>
            </Grid>
            <Grid item xs={12}>
                <TrustedCompanies />
            </Grid>
        </Grid>
    );
};

export default TrustedCompaniesSection;