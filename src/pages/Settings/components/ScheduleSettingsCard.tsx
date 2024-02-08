import { useNavigate } from "react-router-dom";
import SettingCard from "../../../components/SettingCard";
import React from "react";
import { Typography } from "@mui/material";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const ScheduleSettingsCard = () => {
    const navigate = useNavigate();

    return (
        <SettingCard.Root onClick={() => navigate("/management-panel/settings/schedule-schemas")}>
            <SettingCard.Icon>
                <CalendarMonthOutlinedIcon />
            </SettingCard.Icon>
            <SettingCard.Title>
                <Typography variant="subtitle1">Schematy grafików</Typography>
            </SettingCard.Title>
        </SettingCard.Root >
    );
};

export default ScheduleSettingsCard;

