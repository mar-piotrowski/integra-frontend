import React, {useMemo, useState} from "react";
import {Button, Grid, ListItemIcon, ListItemText, MenuItem, Typography} from "@mui/material";
import {Box} from "@mui/system";
import CustomTable from "../../components/CustomTable";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {MRT_ColumnDef} from "material-react-table";
import ModalArrangeUserAbsent from "../../features/modals/ModalArrangeUserAbsent";
import {UserAbsent, UserAbsentHistory} from "../../constants/models";
import ModalLimitUserHoliday from "../../features/modals/ModalLimitUserHoliday";
import { HolidayLimit } from "../../api/types/documentTypes";
import useGetHolidayLimits from "../../hooks/holidayLimits/useGetHolidayLimits";

export const mockLimit: UserAbsent[] = [
    {
        userId: 1,
        year: 2023,
        typ: "Wypoczynkowy",
        days: 20,
        days_used: 2,
        days_moved: 3,
        description: "abc"
    }
]

export const mockArrange: UserAbsentHistory[] = [
    {
        userId: 1,
        holidayType: "Wypoczynkowy",
        startDate: "2020-01-01",
        endDate: "2023-01-01",
        accepted: true,
        description: "abn"
    }
]

const EmployeeAbsence = () => {
    const {data: holidayLimits} = useGetHolidayLimits();
    const [limitHolidayModal, setLimitHolidayModal] = useState<boolean>(false);
    const [arrangeAbsentModal, setArrangeAbsentModal] = useState<boolean>(false);

    const columnsLimitHoliday = useMemo<MRT_ColumnDef<HolidayLimit>[]>(
        () => [
            {
                accessorKey: "current",
                header: "Rok",
                Cell: ({row}) => <div>{new Date(row.original.current).getFullYear()}</div>
            },
            {
                accessorKey: "availableDays",
                header: "Dostępne",
            },
            {
                accessorKey: "usedDays",
                header: "Wykorzystane",
            },
            {
                accessorKey: "mergedDays",
                header: "Przeniesione",
            },
        ],
        []
    );

    const columnsArrangeAbsent = useMemo<MRT_ColumnDef<UserAbsentHistory>[]>(
        () => [
            {
                accessorKey: "holidayType",
                header: "Typ",
            },
            {
                accessorKey: "startDate",
                header: "Od",
            },
            {
                accessorKey: "endDate",
                header: "Do",
            },
        ],
        []
    );

    const openLimitHolidayModal = () => setLimitHolidayModal(true);

    const closeLimitHolidayModal = () => setLimitHolidayModal(false);

    const openArrangeAbsentModal = () => setArrangeAbsentModal(true);

    const closeArrangeAbsentModal = () => setArrangeAbsentModal(false);

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h4">Limity urlopowe</Typography>
                    </Grid>
                    <Grid item container justifyContent={"flex-end"}>
                        <Button
                            variant="contained"
                            disableElevation
                            onClick={openLimitHolidayModal}
                        >
                            Dodaj limit
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTable
                            columns={columnsLimitHoliday}
                            data={holidayLimits ?? []}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4">Nieobecności</Typography>
                    </Grid>
                    <Grid item container justifyContent={"flex-end"}>
                        <Button
                            variant="contained"
                            disableElevation
                            onClick={openArrangeAbsentModal}
                        >
                            Dodaj nieobecność
                        </Button>
                    </Grid>
                    <Grid xs={12}>
                        <CustomTable
                            columns={columnsArrangeAbsent}
                            data={mockArrange}
                            renderRowActionMenuItems={() => [
                                <MenuItem key="edit" onClick={() => console.info("Edit")}>
                                    <ListItemIcon>
                                        <EditOutlinedIcon/>
                                    </ListItemIcon>
                                    <ListItemText>Edytuj</ListItemText>
                                </MenuItem>,
                                <MenuItem key="delete" onClick={() => console.info("Delete")}>
                                    <ListItemIcon>
                                        <DeleteOutlineOutlinedIcon/>
                                    </ListItemIcon>
                                    <ListItemText>Usuń</ListItemText>
                                </MenuItem>,
                            ]}
                        />
                    </Grid>
                </Grid>
            </Box>
            <ModalArrangeUserAbsent open={arrangeAbsentModal} onClose={closeArrangeAbsentModal}/>
            <ModalLimitUserHoliday open={limitHolidayModal} onClose={closeLimitHolidayModal}/>
        </>
    )
}

export default EmployeeAbsence;