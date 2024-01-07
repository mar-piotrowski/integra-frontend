import React from "react";
import SettingCard from "../../../../components/SettingCard";
import { Typography } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';
import { useNavigate } from "react-router-dom";

const ManagementPanelJobPositionSetting = () => {
    const navigate = useNavigate();

    return (
        <SettingCard.Root onClick={() => navigate("/management-panel/settings/job-positions")}>
            <SettingCard.Icon>
                <WorkIcon />
            </SettingCard.Icon>
            <SettingCard.Title>
                <Typography variant="subtitle1">Stanowiska pracy</Typography>
            </SettingCard.Title>
        </SettingCard.Root >
    );
};

export default ManagementPanelJobPositionSetting;