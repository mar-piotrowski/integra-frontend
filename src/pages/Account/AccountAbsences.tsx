import React, {useMemo,} from "react";
import {Grid} from "@mui/material";
import CustomTable from "../../components/CustomTable";
import {MRT_ColumnDef} from "material-react-table";
import {UserAbsence} from "../../constants/models";
import {HolidayLimit} from "../../api/types/documentTypes";
import useHolidayLimits from "../../hooks/holidayLimits/useGetHolidayLimits";
import useAbsences from "../../hooks/absence/useAbsences";
import {toDateString} from "../../utils/dateHelper";
import useAuth from "../../hooks/auth/useAuth";
import {absenceStatus, absenceTypeMapper} from "../Absences/Absences";

const AccountAbsences = () => {
    const {auth} = useAuth();
    const {data: holidayLimits} = useHolidayLimits(auth!.userId);
    const {data: absences} = useAbsences(auth!.userId);

    const columnsLimitHoliday = useMemo<MRT_ColumnDef<HolidayLimit>[]>(
        () => [
            {
                accessorKey: "current",
                header: "Rok",
                Cell: ({row}) => <div>{new Date(row.original.current).getFullYear()}</div>
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
                Cell: ({row}) => <div>{absenceTypeMapper(row.original.type)}</div>
            },
            {
                accessorKey: "startDate",
                header: "Od",
                Cell: ({row}) => <div>{toDateString(row.original.startDate)}</div>
            },
            {
                accessorKey: "endDate",
                header: "Do", Cell: ({row}) => <div>{toDateString(row.original.endDate)}</div>
            },
            {
                accessorKey: "status",
                header: "Status",
                Cell: ({row}) => <div>{absenceStatus(row.original.status)}</div>
            }
        ],
        []
    );

    return (
        <>
            <Grid container spacing={4}>
                <Grid item container xs={12}>
                    <Grid item xs={12}>
                        <CustomTable columns={columnsLimitHoliday} data={holidayLimits ?? []}/>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable columns={columnsArrangeAbsent} data={absences ?? []}/>
                </Grid>
            </Grid>
        </>
    )
}

export default AccountAbsences;