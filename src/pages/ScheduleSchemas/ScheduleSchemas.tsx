import { Typography, Grid, MenuItem, ListItemIcon, ListItemText, Button } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import React, { useMemo, useState } from "react";
import { ScheduleDay, ScheduleDto } from "../../api/types/scheduleTypes";
import CustomTable from "../../components/CustomTable";
import { Day } from "../../constants/enums";
import ScheduleDayHours from "../../features/Schedule/ScheduleDayHours";
import useGetSchedules from "../../hooks/schedule/useGetSchedules";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useBoolean } from "../../hooks/useBoolean";
import ScheduleModal from "./modals/CreateSchedule/ScheduleModal";
import { toDateString } from "../../utils/dateHelper";
import DeleteScheduleModal from "../../features/modals/deleteSchedule/DeleteScheduleModal";

export const scheduleDayHourResolver = (weekDay: Day, days: ScheduleDay[]) => {
    if (days.length == 0)
        return <Typography variant="body1">Brak</Typography>
    var findDay = days.find(day => day.day == weekDay);
    if (findDay == undefined)
        return <Typography variant="body1">Brak</Typography>
    return <ScheduleDayHours startHour={findDay.startDate} endHour={findDay.endDate} />
}

const ScheduleSchemas = () => {
    const { data: schedules, isLoading: schedulesLoading } = useGetSchedules();
    const {
        value: addScheduleModal,
        setTrue: openAddScheduleModal,
        setFalse: closeAddScheduleModal
    } = useBoolean(false);
    const {
        value: deleteScheduleModal,
        setTrue: openDeleteScheduleModal,
        setFalse: closeDeleteScheduleModal
    } = useBoolean(false);
    const [scheduleToEdit, setScheduleToEdit] = useState<ScheduleDto | null>(null);


    const columns = useMemo<MRT_ColumnDef<ScheduleDto>[]>(() =>
        [
            {
                accessorKey: "name",
                header: "Nazwa",
                size: 150
            },
            {
                accessorKey: "endDate",
                header: "Od",
                size: 80,
                Cell: ({ row }) => <div>{toDateString(row.original.startDate)}</div>
            },
            {
                accessorKey: "startDate",
                header: "Do",
                size: 80,
                Cell: ({ row }) => <div>{row.original.endDate != null ? toDateString(row.original.endDate) : "Brak"}</div>
            },
            {
                header: "Poniedziałek",
                Cell: ({ row }) => scheduleDayHourResolver(Day.Monday, row.original.days),
                size: 50
            },
            {
                header: "Wtorek",
                Cell: ({ row }) => scheduleDayHourResolver(Day.Tuesday, row.original.days),
                size: 120
            },
            {
                header: "Środa",
                Cell: ({ row }) => scheduleDayHourResolver(Day.Wednesday, row.original.days),
                size: 120
            },
            {
                header: "Czwartek",
                Cell: ({ row }) => scheduleDayHourResolver(Day.Thursday, row.original.days),
                size: 100
            },
            {
                header: "Piątek",
                Cell: ({ row }) => scheduleDayHourResolver(Day.Friday, row.original.days),
                size: 120

            },
            {
                header: "Sobota",
                Cell: ({ row }) => scheduleDayHourResolver(Day.Saturday, row.original.days),

                size: 120
            },
            {
                header: "Niedziela",
                Cell: ({ row }) => scheduleDayHourResolver(Day.Sunday, row.original.days),
                size: 120
            },
            {
                accessorKey: "totalHours",
                header: "Suma godzin",
                size: 50
            }
        ],
        []
    );

    const handleOnCloseModal = () => {
        closeAddScheduleModal();
        setScheduleToEdit(null)
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item>
                    <Button disableElevation variant="contained" onClick={openAddScheduleModal}>Dodaj grafik</Button>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        data={schedules ?? []}
                        columns={columns}
                        enableRowActions
                        renderRowActionMenuItems={({ row, closeMenu }) => [
                            <MenuItem key="edit" onClick={() => {
                                setScheduleToEdit(row.original);
                                openAddScheduleModal();
                                closeMenu();
                            }}>
                                <ListItemIcon>
                                    <EditOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText>Edytuj</ListItemText>
                            </MenuItem>,
                            <MenuItem key="delete" onClick={() => {
                                setScheduleToEdit(row.original);
                                openDeleteScheduleModal();
                                closeMenu();
                            }}>
                                <ListItemIcon>
                                    <DeleteOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText>Usuń</ListItemText>
                            </MenuItem>,
                        ]}
                    />
                </Grid>
            </Grid>
            {
                addScheduleModal
                    ? <ScheduleModal
                        isOpen={addScheduleModal}
                        onClose={handleOnCloseModal}
                        scheduleToEdit={scheduleToEdit}
                    />
                    : null
            }
            {
                deleteScheduleModal
                    ? <DeleteScheduleModal
                        isOpen={deleteScheduleModal}
                        onClose={closeDeleteScheduleModal}
                        scheduleId={scheduleToEdit!.id}
                    />
                    : null
            }
        </>
    );
};

export default ScheduleSchemas;