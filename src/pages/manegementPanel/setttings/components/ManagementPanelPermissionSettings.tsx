import { useNavigate } from "react-router-dom";
import SettingCard from "../../../../components/SettingCard";
import React from "react";
import { Typography } from "@mui/material";
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';

const ManagementPanelPermissionSettings = () => {
    const navigate = useNavigate();

    return (
        <SettingCard.Root onClick={() => navigate("/management-panel/settings/permissions")}>
            <SettingCard.Icon>
                <BoltOutlinedIcon />
            </SettingCard.Icon>
            <SettingCard.Title>
                <Typography variant="subtitle1">Uprawnienia</Typography>
            </SettingCard.Title>
        </SettingCard.Root >
    );
};

export default ManagementPanelPermissionSettings;
