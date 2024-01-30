import { Grid, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { Box } from "@mui/system";
import React, { useMemo } from "react";
import CustomTable from "../../components/CustomTable";
import ShowAmount from "../../components/ShowAmount";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import { MRT_ColumnDef } from "material-react-table";
import { UserDto } from "../../api/types/userTypes";
import { useNavigate } from "react-router-dom";
import useGetAbsences from "../../hooks/absence/useGetAbsences";
import { absenceStatus, absenceTypeMapper } from "./employee/ManagementEmployeeAbsences";
import { UserAbsence } from "../../constants/models";
import { toDateString } from "../../utils/dateHelper";

const Absences = () => {
    const navigate = useNavigate();
    const { data: absences } = useGetAbsences();
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
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} justifyContent="flex-end">
                    <Grid item xs={12} sm={4} md={3} lg={2}>
                        <ShowAmount label="Oczekujące" value={100} color="blue" />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} lg={2}>
                        <ShowAmount label="Zaakceptowane" value={100} color="green" />
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} lg={2}>
                        <ShowAmount label="Odrzucone" value={100} color="red" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <CustomTable
                            columns={columns}
                            data={absences ?? []}
                            enableSelectAll
                            muiTableBodyRowProps={({ row }) => ({
                                onClick: () => {
                                    var number = row.original.user.id;
                                    navigate(`/management-panel/employee/${number}/absence`)
                                },
                                sx: { cursor: "pointer" }
                            })}

                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Absences;
