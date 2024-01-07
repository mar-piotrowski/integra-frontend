import React from "react";
import Modules from "./Modules";
import ModulesSectionHeader from "./components/ModulesSectioHeader";
import { Grid } from "@mui/material";

const ModulesSection = () => {
    return (
        <Grid container spacing={4}>
            <Grid item>
                <ModulesSectionHeader />
            </Grid>
            <Grid item xs={12} mt={4}>
                <Modules />
            </Grid>
        </Grid>
    );
};

export default ModulesSection;