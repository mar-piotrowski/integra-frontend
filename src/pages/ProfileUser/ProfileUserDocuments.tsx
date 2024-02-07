import { Grid } from "@mui/material";
import React from "react";
import ProfileUserSchoolHistory from "./ProfileUserSchoolHistory";
import ProfileUserJobHistory from "./ProfileUserJobHistory";

const ProfileUserDocuments = () => {
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <ProfileUserJobHistory />
            </Grid>
            <Grid item xs={12}>
                <ProfileUserSchoolHistory />
            </Grid>
        </Grid>
    )
}

export default ProfileUserDocuments;