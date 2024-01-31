import { Grid, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import React, { useMemo } from "react";
import ButtonDropdown, { ButtonDropdownItem } from "../../components/ButtonDropdown";
import CustomTable from "../../components/CustomTable";
import { MRT_ColumnDef } from "material-react-table";
import { Invoice } from "../../constants/models";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const issueMenuItems: ButtonDropdownItem[] = [
    {
        label: "Wydanie zewnetrzne",
        to: "/management-panel/wz"
    },
    {
        label: "Rozchód wewnętrzny",
        to: "/management-panel/rw"
    }
]

const receptionMenuItems: ButtonDropdownItem[] = [
    {
        label: "Przyjęcie wewnętrzne",
        to: "/management-panel/pw"
    },
    {
        label: "Przyjęcie zewnętrzne",
        to: "/management-panel/pz"
    }
]

const StockDocuments = () => {
    const columns = useMemo<MRT_ColumnDef<Invoice>[]>(
        () => [
            {
                accessorKey: "number",
                header: "Numer"
            },
            {
                accessorKey: "invoiceType",
                header: "Typ"
            },
            {
                accessorKey: "issueDate",
                header: "Data wystawienia"
            },
        ],
        []
    );

    return (
        <Grid container spacing={2}>
            <Grid item container spacing={2}>
                <Grid item>
                    <ButtonDropdown label={"Wydanie"} items={issueMenuItems} />
                </Grid>
                <Grid item>
                    <ButtonDropdown label={"Przyjęcie"} items={receptionMenuItems} />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <CustomTable
                    columns={columns}
                    data={[]}
                    enableRowActions
                    renderRowActionMenuItems={({ row, closeMenu }) => [
                        <MenuItem key="edit" onClick={() => {
                            closeMenu();
                        }}>
                            <ListItemIcon>
                                <EditOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText>Edytuj</ListItemText>
                        </MenuItem>,
                        <MenuItem key="delete" onClick={() => {
                            closeMenu();
                        }}>
                            <ListItemIcon>
                                <DeleteOutlineOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText>Usuń</ListItemText>
                        </MenuItem>,
                    ]}
                    muiTableBodyRowProps={({ row }) => ({
                        onClick: () => { },
                        sx: { cursor: "pointer" }
                    })}
                />
            </Grid>
        </Grid>
    );
};

export default StockDocuments;