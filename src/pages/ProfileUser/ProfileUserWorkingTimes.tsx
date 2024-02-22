import React, {useMemo, useState} from "react";
import {Grid, ListItemIcon, ListItemText, MenuItem, Typography} from "@mui/material";
import CustomTable from "../../components/CustomTable";
import {MRT_ColumnDef} from "material-react-table";
import {WorkingTimeDto} from "../../api/types/workingTimeTypes";
import {Box} from "@mui/system";
import {useParams} from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {useBoolean} from "../../hooks/useBoolean";
import ModalEditWorkingTime from "../../features/modals/ModalEditWorkingTime";
import ModalDeleteWorkingTime from "../../features/modals/ModalDeleteWorkingTime";
import useWorkingTimes from "../../hooks/workingTime/useWorkingTimes";
import {convertSecondsToStringHoursAndMinutes, toEuropeDate} from "../../utils/dateHelper";
import {workingTimeStatusMapper} from "../../utils/workingTimeUtils";
import useWorkingTimeUserStats from "../../hooks/workingTime/useWorkingTimeUserStats";

interface CustomBoxProps {
    children: JSX.Element | JSX.Element[];
}

const CustomBox = ({children}: CustomBoxProps) => {
    return (
        <Box sx={{
            p: 3,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#ececec",
            borderRadius: 2
        }}>
            {children}
        </Box>
    );
}

const ProfileUserWorkingTimes = () => {
    const {userId} = useParams();
    const {data: userWorkingTimes} = useWorkingTimes(parseInt(userId!));
    const {data: statsWorkingTime} = useWorkingTimeUserStats({
        userId: parseInt(userId!),
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1
    })
    const [workingTime, setWorkingTime] = useState<WorkingTimeDto | null>(null);
    const {
        value: editWorkingTimeModal,
        setTrue: openEditWorkingTimeModal,
        setFalse: closeEditWorkingTimeModal
    } = useBoolean(false);
    const {
        value: deleteWorkingTimeModal,
        setTrue: openDeleteWorkingTimeModal,
        setFalse: closeDeleteWorkingTimeModal
    } = useBoolean(false);

    const columns = useMemo<MRT_ColumnDef<WorkingTimeDto>[]>(
        () => [
            {
                accessorKey: "startDate",
                header: "Rozpoczęcie",
                Cell: ({row}) => <div>{toEuropeDate(row.original.startDate, "DD/MM/YYYY HH:mm")}</div>
            },
            {
                accessorKey: "endDate",
                header: "Zakończenie",
                Cell: ({row}) => <div>{
                    row.original.endDate != null
                        ? toEuropeDate(row.original.endDate, "DD/MM/YYYY HH:mm")
                        : "Brak"
                }</div>
            },
            {
                accessorKey: "totalSeconds",
                header: "Suma godzin",
                Cell: ({row}) => <div>{convertSecondsToStringHoursAndMinutes(row.original.totalSeconds)}</div>
            },
            {
                accessorKey: "status",
                header: "Status",
                Cell: ({row}) => <div>{workingTimeStatusMapper(row.original.status)}</div>
            },
        ],
        []
    );


    const handleCloseEditModal = () => {
        closeEditWorkingTimeModal();
        setWorkingTime(null);
    }

    const handleCloseDeleteModal = () => {
        closeDeleteWorkingTimeModal();
        setWorkingTime(null);
    }

    return (
        <>
            <Grid container>
                <Grid item container spacing={2} mb={2}>
                    <Grid item xs={12} md={6}>
                        <CustomBox>
                            <Typography variant={"subtitle1"}>Aktualny miesiac</Typography>
                            <Typography
                                variant={"subtitle1"}
                                color={"green"}>{convertSecondsToStringHoursAndMinutes(statsWorkingTime?.totalUserWorkedSeconds ?? 0)}
                                {" "}
                            </Typography>
                        </CustomBox>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomBox>
                            <Typography variant={"subtitle1"}>Nadgodziny</Typography>
                            <Typography
                                variant={"subtitle1"}
                                color={"blue"}>{convertSecondsToStringHoursAndMinutes(statsWorkingTime?.overUserWorkedHours ?? 0)}
                                {" "}
                            </Typography>
                        </CustomBox>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        columns={columns}
                        data={userWorkingTimes ?? []}
                        enableRowActions
                        renderRowActionMenuItems={({closeMenu, row}) => [
                            <MenuItem key="edit" onClick={() => {
                                openEditWorkingTimeModal();
                                setWorkingTime(row.original);
                                closeMenu();
                            }}>
                                <ListItemIcon>
                                    <EditOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText>Edytuj</ListItemText>
                            </MenuItem>,
                            <MenuItem key="delete" onClick={() => {
                                openDeleteWorkingTimeModal();
                                setWorkingTime(row.original);
                                closeMenu();
                            }}>
                                <ListItemIcon>
                                    <DeleteOutlineOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText>Usuń</ListItemText>
                            </MenuItem>,
                        ]}
                    />
                </Grid>
            </Grid>
            {
                editWorkingTimeModal
                    ? <ModalEditWorkingTime
                        isOpen={editWorkingTimeModal}
                        onClose={handleCloseEditModal}
                        workingTime={workingTime!}
                    />
                    : null
            }
            {
                deleteWorkingTimeModal
                    ? <ModalDeleteWorkingTime
                        isOpen={deleteWorkingTimeModal}
                        onClose={handleCloseDeleteModal}
                        workingTimeId={workingTime!.id}
                    />
                    : null
            }
        </>
    );
};

export default ProfileUserWorkingTimes;