import { Grid } from "@mui/material";
import React from "react";
import ManagementPanelJobPositionSetting from "./components/ManagementPanelJobPositionSettings";
import ManagementPanelPermissionSettings from "./components/ManagementPanelPermissionSettings";

const ManagementPanelSettings = () => {
    return (
        <Grid container spacing={3}>
            <Grid item>
                <ManagementPanelJobPositionSetting />
            </Grid>
            <Grid item>
                <ManagementPanelPermissionSettings />
            </Grid>
        </Grid>
    );
};

export default ManagementPanelSettings;