import React, { useMemo, useState } from "react";
import { Box, Button, Grid, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import CustomTable from "../../components/CustomTable";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { MRT_ColumnDef } from "material-react-table";
import ModalArrangeUserAbsent from "../../features/modals/ModalArrangeUserAbsent";
import { UserAbsence } from "../../constants/models";
import ModalLimitUserHoliday from "../../features/modals/ModalLimitUserHoliday";
import { HolidayLimit } from "../../api/types/documentTypes";
import useGetHolidayLimits from "../../hooks/holidayLimits/useGetHolidayLimits";
import HeaderAction from "../../components/HeaderAction";
import { useParams } from "react-router-dom";
import useAbsences from "../../hooks/absence/useAbsences";
import { toDateString } from "../../utils/dateHelper";
import CheckIcon from '@mui/icons-material/Check';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { AbsenceStatus } from "../../constants/enums";
import useDeleteAbsence from "../../hooks/absence/useDeleteAbsence";
import { errorToast } from "../../utils/toastUtil";
import { UpdateAbsence } from "../../api/types/absenceTypes";
import useAcceptAbsence from "../../hooks/absence/useAcceptAbsence";
import useRejectAbsence from "../../hooks/absence/useRejectAbsence";
import {absenceStatus, absenceTypeMapper} from "../Absences/Absences";

const ProfileUserAbsences = () => {
    const { userId } = useParams();
    const { data: holidayLimits } = useGetHolidayLimits(parseInt(userId!));
    const { data: absences } = useAbsences(parseInt(userId!));
    const { mutate: acceptAbsence } = useAcceptAbsence();
    const { mutate: rejectAbsence } = useRejectAbsence();
    const { mutate: deleteAbsence } = useDeleteAbsence();
    const [limitHolidayModal, setLimitHolidayModal] = useState<boolean>(false);
    const [arrangeAbsentModal, setArrangeAbsentModal] = useState<boolean>(false);
    const [absence, setAbsence] = useState<UpdateAbsence | null>(null);

    const columnsLimitHoliday = useMemo<MRT_ColumnDef<HolidayLimit>[]>(
        () => [
            {
                accessorKey: "current",
                header: "Rok",
                Cell: ({ row }) => <div>{new Date(row.original.current).getFullYear()}</div>
            },
            {
                accessorKey: "availableDays",
                header: "Limit",
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

    const columnsArrangeAbsent = useMemo<MRT_ColumnDef<UserAbsence>[]>(
        () => [
            {
                accessorKey: "type",
                header: "Typ",
                Cell: ({ row }) => <div>{absenceTypeMapper(row.original.type)}</div>
            },
            {
                accessorKey: "startDate",
                header: "Od",
                Cell: ({ row }) => <div>{toDateString(row.original.startDate)}</div>
            },
            {
                accessorKey: "endDate",
                header: "Do", Cell: ({ row }) => <div>{toDateString(row.original.endDate)}</div>
            },
            {
                accessorKey: "status",
                header: "Status",
                Cell: ({ row }) => <div>{absenceStatus(row.original.status)}</div>
            }
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
                            data={absences ?? []}
                            enableRowActions
                            renderRowActionMenuItems={({ row, closeMenu }) => [
                                <MenuItem key="edit" onClick={() => {
                                    if (row.original.status != AbsenceStatus.Pending) {
                                        errorToast("Nie można edytować nieobecności");
                                        return;
                                    }
                                    setAbsence({
                                        absenceId: row.original.id,
                                        userId: row.original.user.id,
                                        ...row.original
                                    });
                                    openArrangeAbsentModal();
                                }}>
                                    <ListItemIcon>
                                        <EditOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText>Edytuj</ListItemText>
                                </MenuItem>,
                                <MenuItem key="delete" onClick={() => {
                                    acceptAbsence(row.original.id)
                                    closeMenu();
                                }}>
                                    <ListItemIcon>
                                        <CheckIcon />
                                    </ListItemIcon>
                                    <ListItemText>Akceptuj</ListItemText>
                                </MenuItem>,
                                <MenuItem key="delete" onClick={() => {
                                    rejectAbsence(row.original.id)
                                    closeMenu();
                                }}>
                                    <ListItemIcon>
                                        <CloseOutlinedIcon />
                                    </ListItemIcon>
                                    <ListItemText>Odrzuć</ListItemText>
                                </MenuItem>,
                                <MenuItem key="delete" onClick={() => {
                                    deleteAbsence(row.original.id);
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
            </Grid >
            <ModalArrangeUserAbsent open={arrangeAbsentModal} onClose={closeArrangeAbsentModal} absence={absence} />
            <ModalLimitUserHoliday open={limitHolidayModal} onClose={closeLimitHolidayModal} />
        </>
    )
}

export default ProfileUserAbsences;