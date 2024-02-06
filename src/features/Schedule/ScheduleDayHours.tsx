import React from "react";
import { Box, Typography } from "@mui/material";
import moment from "moment";

type ScheduleDayProps = {
    startHour: string;
    endHour: string;
}

const ScheduleDayHours = ({ startHour, endHour }: ScheduleDayProps) => {
    return (
        <Box>
            <Typography variant="body1">
                {moment(startHour).format("HH:mm")} {moment(endHour).format("HH:mm")}
            </Typography>
        </Box>
    );
};

export default ScheduleDayHours;
