import { Grid, Typography } from "@mui/material";
import React from "react";
import SettingCard from "../components/SettingCard";
import WorkIcon from '@mui/icons-material/Work';
import { useNavigate } from "react-router-dom";

const ManagementPanelSettings = () => {
    const navigate = useNavigate();

    return (
        <Grid container>
            <SettingCard.Root onClick={() => navigate("/management-panel/job-positions")}>
                <SettingCard.Icon>
                    <WorkIcon />
                </SettingCard.Icon>
                <SettingCard.Title>
                    <Typography variant="subtitle1">Stanowiska</Typography>
                </SettingCard.Title>
            </SettingCard.Root>
        </Grid>
    );
};

export default ManagementPanelSettings;