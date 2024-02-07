import {Button, Grid} from "@mui/material";
import CustomTable from "../../components/CustomTable";
import React, {useMemo} from "react";
import {MRT_ColumnDef} from "material-react-table";
import {useNavigate} from "react-router-dom";
import useGetContracts from "../../hooks/contract/useGetContracts";
import {toDateString} from "../../utils/dateHelper";
import {ContractDto} from "../../api/types/documentTypes";

const Contracts = () => {
    const {data: contracts} = useGetContracts();
    const navigate = useNavigate();

    const columns = useMemo<MRT_ColumnDef<ContractDto>[]>(
        () => [
            {
                accesorKey: "id",
                header: "Id",
                size: 50,
                Cell: ({row}) => <div>{row.original.id}</div>
            },
            {
                header: "Pracownik",
                Cell: ({row}) => <div>{row.original.user.firstname} {row.original.user.lastname}</div>
            },
            {
                accessorKey: "contractType",
                header: "Typ"
            },
            {
                header: "Wymiar",
                Cell: ({row}) => <div>{row.original.workingHours1}/{row.original.workingHours2}</div>
            },
            {
                accessorKey: "startDate",
                header: "Od",
                Cell: ({row}) => <div>{toDateString(row.original.startDate)}</div>
            },
            {
                accessorKey: "endDate",
                header: "Do",
                Cell: ({row}) => <div>{row.original.endDate != null ? toDateString(row.original.endDate) : "Brak"}</div>
            },
            {
                accessorKey: "salaryWithTax",
                header: "Wynagrodzenie brutto"
            },
            {
                accessorKey: "salaryWithoutTax",
                header: "Wynagrodzenie netto"
            }
        ],
        []
    );

    return (
        <>
            <Grid sx={{flexGrow: 1}} container spacing={2}>
                <Grid item xs={12}>
                    <CustomTable
                        columns={columns}
                        data={contracts ?? []}
                        enableRowActions
                        muiTableBodyRowProps={({row}) => ({
                            onClick: () => navigate(`/management-panel/employee/${row.original.user.id}/contracts`),
                            sx: {cursor: "pointer"}
                        })}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default Contracts;