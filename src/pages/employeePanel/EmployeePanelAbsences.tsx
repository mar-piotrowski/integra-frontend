import CustomTable from "../../components/CustomTable";
import { Box, Grid, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { UserAbsence } from "../../constants/models";
import { HolidayLimit } from "../../api/types/documentTypes";
import useGetHolidayLimits from "../../hooks/holidayLimits/useGetHolidayLimits";
import useAuth from "../../hooks/auth/useAuth";
import useGetAbsences from "../../hooks/absence/useGetAbsences";
import { toDateString } from "../../utils/dateHelper";
import { absenceTypeMapper, absenceStatus } from "../manegementPanel/employee/ManagementEmployeeAbsences";

const EmployeePanelAbsences = () => {
    const { auth } = useAuth();
    const { data: holidayLimits } = useGetHolidayLimits(auth?.userId);
    const { data: absences } = useGetAbsences(auth!.userId);

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
                        <Typography variant="h4">Limity urlopowe</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTable
                            columns={columnsLimitHoliday}
                            data={holidayLimits ?? []}
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4">Nieobecności</Typography>
                </Grid>
                <Grid xs={12}>
                    <CustomTable
                        columns={columnsArrangeAbsent}
                        data={absences ?? []}
                    />
                </Grid>
            </Box>
        </>
    )
}

export default EmployeePanelAbsences;

