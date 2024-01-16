import React, { useMemo, useState } from "react";
import { Button, Grid, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import CustomTable from "../../../components/CustomTable";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { MRT_ColumnDef } from "material-react-table";
import ModalArrangeUserAbsent from "../../../features/modals/ModalArrangeUserAbsent";
import { UserAbsent, UserAbsentHistory } from "../../../constants/models";
import ModalLimitUserHoliday from "../../../features/modals/ModalLimitUserHoliday";
import { HolidayLimit } from "../../../api/types/documentTypes";
import useGetHolidayLimits from "../../../hooks/holidayLimits/useGetHolidayLimits";
import HeaderAction from "../../../components/HeaderAction";
import { useParams } from "react-router-dom";

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

const ManagementEmployeeAbsences = () => {
    const { userId } = useParams();
    const { data: holidayLimits } = useGetHolidayLimits(parseInt(userId!));
    const [limitHolidayModal, setLimitHolidayModal] = useState<boolean>(false);
    const [arrangeAbsentModal, setArrangeAbsentModal] = useState<boolean>(false);

    const columnsLimitHoliday = useMemo<MRT_ColumnDef<HolidayLimit>[]>(
        () => [
            {
                accessorKey: "current",
                header: "Rok",
                Cell: ({ row }) => <div>{new Date(row.original.current).getFullYear()}</div>
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
            <Grid container spacing={4}>
                <Grid item container xs={12}>
                    <Grid item xs={12}>
                        <HeaderAction title={"Limity urlopowe"}>
                            <Button
                                variant="contained"
                                disableElevation
                                onClick={openLimitHolidayModal}
                            >
                                Dodaj limit
                            </Button>
                        </HeaderAction>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTable
                            columns={columnsLimitHoliday}
                            data={holidayLimits ?? []}
                        />
                    </Grid>
                </Grid>
                <Grid item container xs={12}>
                    <Grid item xs={12}>
                        <HeaderAction title={"Nieobecności"}>
                            <Button
                                variant="contained"
                                disableElevation
                                onClick={openArrangeAbsentModal}
                            >
                                Dodaj nieobecność
                            </Button>
                        </HeaderAction>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTable
                            columns={columnsArrangeAbsent}
                            data={mockArrange}
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
            </Grid>
            <ModalArrangeUserAbsent open={arrangeAbsentModal} onClose={closeArrangeAbsentModal} />
            <ModalLimitUserHoliday open={limitHolidayModal} onClose={closeLimitHolidayModal} />
        </>
    )
}

export default ManagementEmployeeAbsences;