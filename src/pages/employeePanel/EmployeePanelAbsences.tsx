import CustomTable from "../../components/CustomTable";
import { Box, Grid, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { UserAbsentHistory } from "../../constants/models";
import { HolidayLimit } from "../../api/types/documentTypes";
import useGetHolidayLimits from "../../hooks/holidayLimits/useGetHolidayLimits";
import useAuth from "../../hooks/auth/useAuth";

const EmployeePanelAbsences = () => {
    const { auth } = useAuth();
    const { data: holidayLimits } = useGetHolidayLimits(auth?.userId);

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
                        data={[]}
                    />
                </Grid>
            </Box>
        </>
    )
}

export default EmployeePanelAbsences;

