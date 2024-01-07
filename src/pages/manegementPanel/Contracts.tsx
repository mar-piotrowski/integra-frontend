import { Button, Grid, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import CustomTable from "../../components/CustomTable";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import React, { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { useNavigate } from "react-router-dom";
import useGetContracts from "../../hooks/contract/useGetContracts";
import { toDateString } from "../../utils/dateHelper";
import { ContractDto } from "../../api/types/documentTypes";

const Contracts = () => {
    const { data: contracts } = useGetContracts();
    const navigate = useNavigate();

    const columns = useMemo<MRT_ColumnDef<ContractDto>[]>(
        () => [
            {
                accesorKey: "id",
                header: "Id",
                Cell: ({ row }) => <div>{row.original.id}</div>
            },
            {
                header: "Pracownik",
                Cell: ({ row }) => <div>{row.original.user.firstname} {row.original.user.lastname}</div>
            },
            {
                accessorKey: "contractType",
                header: "Typ"
            },
            {
                header: "Wymiar",
                Cell: ({ row }) => <div>{row.original.workingHours1}/{row.original.workingHours2}</div>
            },
            {
                accessorKey: "startDate",
                header: "Od",
                Cell: ({ row }) => <div>{toDateString(row.original.startDate)}</div>
            },
            {
                accessorKey: "endDate",
                header: "Do",
                Cell: ({ row }) => <div>{row.original.endDate != null ? toDateString(row.original.endDate) : "Brak"}</div>
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
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item container>
                    <Button
                        variant="outlined"
                        disableElevation
                        onClick={() => navigate("/management-panel/create-contract")}
                    >
                        Dodaj umowę
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        columns={columns}
                        data={contracts ?? []}
                        enableRowActions
                        renderRowActionMenuItems={() => [
                            <MenuItem key="edit" onClick={() => console.info("Dodaj aneks")}>
                                <ListItemIcon>
                                    <EditOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText>Dodaj aneks</ListItemText>
                            </MenuItem>,
                            <MenuItem key="delete" onClick={() => console.info("Delete")}>
                                <ListItemIcon>
                                    <DeleteOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText>Usuń</ListItemText>
                            </MenuItem>,
                        ]}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default Contracts;