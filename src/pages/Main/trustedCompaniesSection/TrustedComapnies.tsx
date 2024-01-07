import { Grid } from "@mui/material";
import React from "react";
import TrustedCompany from "./components/TrustedCompany";

const TrustedCompanies = () => {
    return (
        <Grid container xs={12} spacing={4} mt={1} justifyContent={"center"} alignItems="center">
            <Grid item>
                <TrustedCompany companyName={"Disney"} colaborateFrom={new Date()} />
            </Grid>
            <Grid item>
                <TrustedCompany companyName={"Disney"} colaborateFrom={new Date()} />
            </Grid>
            <Grid item>
                <TrustedCompany companyName={"Disney"} colaborateFrom={new Date()} />
            </Grid>
            <Grid item>
                <TrustedCompany companyName={"Disney"} colaborateFrom={new Date()} />
            </Grid>
            <Grid item>
                <TrustedCompany companyName={"Disney"} colaborateFrom={new Date()} />
            </Grid>
        </Grid>
    );
};

export default TrustedCompanies;