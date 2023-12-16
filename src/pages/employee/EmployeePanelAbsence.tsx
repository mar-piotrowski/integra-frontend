import CustomTable from "../../components/CustomTable";
import {Box, Button, Grid, ListItemIcon, ListItemText, MenuItem, Typography} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import React, {useMemo, useState} from "react";
import {MRT_ColumnDef} from "material-react-table";
import {UserAbsentHistory} from "../../constants/models";
import {mockArrange, mockLimit} from "./EmployeeAbsence";
import ModalArrangeUserAbsent from "../../features/modals/ModalArrangeUserAbsent";
import {HolidayLimit} from "../../api/types/documentTypes";

const EmployeePanelAbsence = () => {
    const [arrangeHoliday, setArrangeHoliday] = useState(false);

    const columnsLimitHoliday = useMemo<MRT_ColumnDef<HolidayLimit>[]>(
        () => [
            {
                accessorKey: "current",
                header: "Rok",
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

    const openArrangeAbsentModal = () => setArrangeHoliday(true);

    const closeArrangeAbsentModal = () => setArrangeHoliday(false);

    return (
        <>
            <Box
                sx={{
                    backgroundColor: "white",
                    padding: "25px",
                    borderRadius: "10px",
                    gap: "20px",
                }}
            >
                <Grid container spacing={2}>
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
                    <Grid item xs={12}>
                        <Typography variant="h4">Limity urlopowe</Typography>
                    </Grid>
                    <Grid item container justifyContent={"flex-end"}>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTable
                            columns={[]}
                            data={mockLimit}
                        />
                    </Grid>
                </Grid>
            </Box>
            <ModalArrangeUserAbsent open={arrangeHoliday} onClose={closeArrangeAbsentModal}/>
        </>
    )
}

export default EmployeePanelAbsence;

