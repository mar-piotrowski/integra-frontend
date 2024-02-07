import {Grid} from "@mui/material";
import React, {useMemo} from "react";
import CustomTable from "../../components/CustomTable";
import useGetJobHistories from "../../hooks/workHistory/useGetJobHistories";
import useGetSchoolHistories from "../../hooks/schoolHistory/useGetSchoolHistories";
import useAuth from "../../hooks/auth/useAuth";
import {MRT_ColumnDef} from "material-react-table";
import {JobHistoryDto, SchoolHistoryDto} from "../../api/types/documentTypes";
import {schoolDegreeMapper} from "../../constants/mappers";
import {toDateString} from "../../utils/dateHelper";

const AccountDocuments = () => {
    const {auth} = useAuth();
    const { data: jobHistories } = useGetJobHistories(auth!.userId);
    const { data: schoolHistories } = useGetSchoolHistories(auth!.userId);

    const schoolHistoryColumns = useMemo<MRT_ColumnDef<SchoolHistoryDto>[]>(
        () => [
            {
                accessorKey: "schoolName",
                header: "Szkoła"
            },
            {
                accessorKey: "specialization",
                header: "Specjalizacja",
                Cell: ({ row }) => <div>{row.original.specialization == null ? "Brak" : row.original.specialization}</div>
            },
            {
                accessorKey: "title",
                header: "Tytuł",
                Cell: ({ row }) => <div>{row.original.title == null ? "Brak" : row.original.title}</div>
            },
            {
                accessorKey: "degree",
                header: "Stopień",
                Cell: ({ row }) => <div>{schoolDegreeMapper(row.original.degree)}</div>
            },
            {
                accessorKey: "startDate",
                header: "Od",
                Cell: ({ row }) => <div>{toDateString(row.original.startDate)}</div>
            },
            {
                accessorKey: "endDate",
                header: "Do",
                Cell: ({ row }) => <div>{toDateString(row.original.endDate)}</div>
            },
        ],
        []
    );

    const jobHistoryColumns = useMemo<MRT_ColumnDef<JobHistoryDto>[]>(
        () => [
            {
                accessorKey: "companyName",
                header: "Firma",
            },
            {
                accessorKey: "position",
                header: "Stanowisko"
            },
            {
                accessorKey: "startDate",
                header: "Od",
                Cell: ({ row }) => <div>{toDateString(row.original.startDate)}</div>
            },
            {
                accessorKey: "endDate",
                header: "Do",
                Cell: ({ row }) => <div>{toDateString(row.original.endDate)}</div>
            }
        ],
        []
    );

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <CustomTable columns={jobHistoryColumns} data={jobHistories ?? []}/>
            </Grid>
            <Grid item xs={12}>
                <CustomTable columns={schoolHistoryColumns} data={schoolHistories ?? []}/>
            </Grid>
        </Grid>
    )
}

export default AccountDocuments;