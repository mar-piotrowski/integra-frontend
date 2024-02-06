import { Grid } from "@mui/material";
import React from "react";
import ManagementPanelJobPositionSetting from "./components/ManagementPanelJobPositionSettings";
import ManagementPanelScheduleSettings from "./components/ManagementPanelScheduleSettings";

const Settings = () => {
    return (
        <Grid container spacing={3}>
            <Grid item>
                <ManagementPanelJobPositionSetting />
            </Grid>
            <Grid item>
                <ManagementPanelScheduleSettings />
            </Grid>
        </Grid>
    );
};

export default Settings;