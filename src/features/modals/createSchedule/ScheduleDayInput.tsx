import { Control } from "react-hook-form";
import { CreateSchedule, ScheduleDay } from "../../../api/types/scheduleTypes";
import { Grid, Typography } from "@mui/material";
import React from "react";
import FormTime from "../../../components/form/FormTime";
import { Day } from "../../../constants/enums";

interface ScheduleDayInputProps {
    control: Control<CreateSchedule>;
    day: ScheduleDay;
    index: number;
}

export const dayNameMapper = (day: Day) => {
    switch (day) {
        case Day.Monday: return "Poniedziałek";
        case Day.Tuesday: return "Wtorek";
        case Day.Thursday: return "Środa";
        case Day.Wednesday: return "Czwartek";
        case Day.Friday: return "Piątek";
        case Day.Saturday: return "Sobota";
        case Day.Sunday: return "Niedziela";
    }
}

const ScheduleDayInput = ({ control, day, index }: ScheduleDayInputProps) => {
    return (
        <Grid
            container
            justifyContent={"center"}
            alignItems={"center"}
            spacing={2}
            mb={2}
        >
            <Grid item sm={12} lg={2}>
                <Typography variant="h4">{dayNameMapper(day.day)}</Typography>
            </Grid>
            <Grid item sm={12} lg={5} >
                <FormTime control={control} name={`days.${index}.startDate`} label="Rozpoczęcie" />
            </Grid>
            <Grid item sm={12} lg={5}>
                <FormTime control={control} name={`days.${index}.endDate`} label="Zakończenie" />
            </Grid>
        </Grid >
    );
};

export default ScheduleDayInput;