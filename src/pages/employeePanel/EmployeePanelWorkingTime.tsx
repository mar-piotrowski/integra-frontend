import React, {useMemo} from "react";
import {Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import CustomTable from "../../components/CustomTable";
import {MRT_ColumnDef} from "material-react-table";
import {WorkingTimeDto} from "../../api/types/workingTimeTypes";
import useAuth from "../../hooks/auth/useAuth";
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
            backgroundColor: "white",
            borderRadius: 2
        }}>
            {children}
        </Box>
    );
}

const EmployeePanelWorkingTime = () => {
    const {auth} = useAuth();
    const {data: userWorkingTimes} = useWorkingTimes(auth!.userId);
    const {data: statsWorkingTime} = useWorkingTimeUserStats({
        userId: auth!.userId,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1
    });

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

    return (
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
            <Grid item xs={12} borderRadius={2} p={3} sx={{background: "white"}}>
                <Grid item xs={12}>
                    <CustomTable
                        columns={columns}
                        data={userWorkingTimes ?? []}
                    />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default EmployeePanelWorkingTime;