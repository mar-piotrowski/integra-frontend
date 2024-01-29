import { Button, Grid } from "@mui/material";
import { useBoolean } from "../../../hooks/useBoolean";
import { useParams } from "react-router-dom";
import React from "react";
import AddUserScheduleModal from "../../../features/modals/addUserSchedule/AddUserScheduleModal";
import Schedule from "../../../features/Schedule";

const ManagementEmployeeSchedule = () => {
    const { userId } = useParams();

    return (
        <Schedule userId={parseInt(userId!)} manage={true} />
    )
}

export default ManagementEmployeeSchedule;