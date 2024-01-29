import React, { useMemo } from "react";
import CustomTable from "../../components/CustomTable";
import CustomModal from "../../components/CustomModal";
import Header from "../../components/CustomModalHeader";
import useGetSchedules from "../../hooks/schedule/useGetSchedules";
import { ScheduleDay, ScheduleDto } from "../../api/types/scheduleTypes";
import ScheduleDayHours from "../ScheduleDayHours";
import { MRT_ColumnDef } from "material-react-table";
import { Grid, ListItemIcon, ListItemText, MenuItem, Typography } from "@mui/material";
import { Day } from "../../constants/enums";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

interface SchedulesModal {
    isOpen: boolean;
    onClose: () => void;
}
const scheduleDayHourResolver = (weekDay: Day, days: ScheduleDay[]) => {
    if (days.length == 0)
        return <Typography variant="body1">Brak</Typography>
    var findDay = days.find(day => day.day == weekDay);
    if (findDay == undefined)
        return <Typography variant="body1">Brak</Typography>
    return <ScheduleDayHours startHour={findDay.startDate} endHour={findDay.endDate} />
}

const SchedulesModal = ({ isOpen, onClose }: SchedulesModal) => {
    const { data: schedules } = useGetSchedules();

    const columns = useMemo<MRT_ColumnDef<ScheduleDto>[]>(() =>
        [
            {
                accessorKey: "name",
                header: "Nazwa",
                size: 50
            },
            {
                accessorKey: "endDate",
                header: "Nazwa",
                size: 50
            },
            {
                accessorKey: "startDate",
                header: "Nazwa",
                size: 50
            },
            {
                header: "Poniedziałek",
                Cell: ({ row }) => scheduleDayHourResolver(Day.Monday, row.original.days),
                size: 50
            },
            {
                header: "Wtorek",
                Cell: ({ row }) => scheduleDayHourResolver(Day.Tuesday, row.original.days),
                size: 50
            },
            {
                header: "Środa",
                Cell: ({ row }) => scheduleDayHourResolver(Day.Wednesday, row.original.days),
                size: 50
            },
            {
                header: "Czwartek",
                Cell: ({ row }) => scheduleDayHourResolver(Day.Thursday, row.original.days),
                size: 50
            },
            {
                header: "Piątek",
                Cell: ({ row }) => scheduleDayHourResolver(Day.Friday, row.original.days),
                size: 50

            },
            {
                header: "Sobota",
                Cell: ({ row }) => scheduleDayHourResolver(Day.Saturday, row.original.days),

                size: 50
            },
            {
                header: "Niedziela",
                Cell: ({ row }) => scheduleDayHourResolver(Day.Sunday, row.original.days),
                size: 50
            }
        ],
        []
    );

    return (
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <Grid container>
                <Grid item xs={12}>
                    <Header title={"Lista schematów"} />
                    <CustomTable
                        data={schedules ?? []}
                        columns={columns}
                        enableRowActions
                        renderRowActionMenuItems={() => [
                            <MenuItem key="edit" onClick={() => console.info("Edit")}>
                                <ListItemIcon>
                                    <EditOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText>Edytuj</ListItemText>
                            </MenuItem>,
                            <MenuItem key="delete" onClick={() => console.info("Delete")}>
                                <ListItemIcon>
                                    <DeleteOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText>Usuń</ListItemText>
                            </MenuItem>,
                        ]}
                    />
                </Grid>
            </Grid>
        </CustomModal>
    );
};

export default SchedulesModal;