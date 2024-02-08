import {Grid} from "@mui/material";
import React from "react";
import JobPositionSettingCard from "./components/JobPositionSettingsCard";
import ScheduleSettingsCard from "./components/ScheduleSettingsCard";

const Settings = () => {
    return (
        <Grid container spacing={3}>
            <Grid item>
                <JobPositionSettingCard/>
            </Grid>
            <Grid item>
                <ScheduleSettingsCard/>
            </Grid>
        </Grid>
    );
};

export default Settings;