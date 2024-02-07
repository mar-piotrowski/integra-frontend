import {Grid} from "@mui/material";
import {Box} from "@mui/system";
import React, {useMemo} from "react";
import CustomTable from "../../components/CustomTable";
import ShowAmount from "../../components/ShowAmount";
import {MRT_ColumnDef} from "material-react-table";
import {useNavigate} from "react-router-dom";
import useAbsences from "../../hooks/absence/useAbsences";
import {UserAbsence} from "../../constants/models";
import {toDateString} from "../../utils/dateHelper";
import {AbsenceStatus} from "../../constants/enums";

export const absenceTypeMapper = (type: number) => {
    switch (type) {
        case 0:
            return "Nieznany";
        case 1:
            return "Wypoczynkowy";
        case 2:
            return "Chorobowy"
    }
}

export const absenceStatus = (status: AbsenceStatus) => {
    switch (status) {
        case AbsenceStatus.Accepted:
            return <Box p={"5px"} borderRadius={1} bgcolor={"#27ae60"} color={"white"}>Zaakceptowany</Box>;
        case AbsenceStatus.Rejected:
            return <Box p={"5px"} borderRadius={1} bgcolor={"#e74c3c"} color={"white"}>Odrzucony</Box>
        case AbsenceStatus.Pending:
            return <Box p={"5px"} borderRadius={1} bgcolor={"#f39c12"} color={"white"}>Oczekuje</Box>
    }
};

const Absences = () => {
    const navigate = useNavigate();
    const {data: absences} = useAbsences();

    const columns = useMemo<MRT_ColumnDef<UserAbsence>[]>(
        () => [
            {
                accessorKey: "user.firstname",
                header: "Imię"
            },
            {
                accessorKey: "user.lastname",
                header: "Nazwisko"
            },
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
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item xs={12} sm={4} md={3} lg={2}>
                        <ShowAmount label="Oczekujące" value={100} color="blue"/>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} lg={2}>
                        <ShowAmount label="Zaakceptowane" value={100} color="green"/>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} lg={2}>
                        <ShowAmount label="Odrzucone" value={100} color="red"/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <CustomTable
                            columns={columns}
                            data={absences ?? []}
                            enableSelectAll
                            muiTableBodyRowProps={({row}) => ({
                                onClick: () =>
                                    navigate(`/management-panel/employee/${row.original.user.id}/absence`),
                                sx: {cursor: "pointer"}
                            })}

                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Absences;
