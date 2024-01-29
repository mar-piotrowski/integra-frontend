import { Grid } from "@mui/material";
import React, { useMemo } from "react";
import CustomTable from "../../components/CustomTable";
import { MRT_ColumnDef } from "material-react-table";
import { ScheduleDay } from "../../api/types/scheduleTypes";
import { scheduleDayHourResolver } from "./ScheduleSchemas";
import { Day } from "../../constants/enums";
import { useNavigate } from "react-router-dom";
import useGetUsersSchedules from "../../hooks/employee/useGetUsersSchedule";

type UserShortDto = {
    id: number;
    firstname: string;
    lastname: string,
    jobPosition: string;
}

type SchedulesWeek = {
    user: UserShortDto;
    totalHours: number;
    days: ScheduleDay[];
}

var date = new Date();

const Schedules = () => {
    const navigate = useNavigate();
    const { data: users } = useGetUsersSchedules(date.getFullYear(), date.getMonth() + 1, true);

    const columns = useMemo<MRT_ColumnDef<SchedulesWeek>[]>(() =>
        [
            {
                accessorKey: "user.firstname",
                header: "Imię",
                size: 100
            },
            {
                accessorKey: "user.lastname",
                header: "Nazwisko",
                size: 100
            },
            {
                header: "Poniedziałek",
                size: 50,
                Cell: ({ row }) => scheduleDayHourResolver(Day.Monday, row.original.days)
            },
            {
                header: "Wtorek",
                size: 120,
                Cell: ({ row }) => scheduleDayHourResolver(Day.Tuesday, row.original.days)
            },
            {
                header: "Środa",
                size: 120,
                Cell: ({ row }) => scheduleDayHourResolver(Day.Wednesday, row.original.days)
            },
            {
                header: "Czwartek",
                size: 120,
                Cell: ({ row }) => scheduleDayHourResolver(Day.Thursday, row.original.days)
            },
            {
                header: "Piątek",
                size: 120,
                Cell: ({ row }) => scheduleDayHourResolver(Day.Friday, row.original.days)
            },
            {
                header: "Sobota",
                size: 120,
                Cell: ({ row }) => scheduleDayHourResolver(Day.Saturday, row.original.days)
            },
            {
                header: "Niedziela",
                size: 120,
                Cell: ({ row }) => scheduleDayHourResolver(Day.Sunday, row.original.days)
            },
            {
                accessorKey: "totalHours",
                header: "Suma godzin"
            }
        ],
        []
    );

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <CustomTable
                    data={users ?? []}
                    columns={columns}
                    muiTableBodyRowProps={({ row }) => ({
                        onClick: () => {
                            navigate(`/management-panel/employee/${row.original.user.id}/schedule`)
                        },
                        sx: { cursor: "pointer" }
                    })}
                />
            </Grid>
        </Grid >
    );
};

export default Schedules;