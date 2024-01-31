import { Grid, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import React, { useMemo } from "react";
import CustomTable from "../../components/CustomTable";
import ButtonDropdown, { ButtonDropdownItem } from "../../components/ButtonDropdown";
import { MRT_ColumnDef } from "material-react-table";
import { Invoice } from "../../constants/models";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useBoolean } from "../../hooks/useBoolean";
import DocumentCreator from "./features/DocumentCreator";

const Invoices = () => {
    const {
        value: invoiceModal,
        setTrue: openInvoiceModal,
        setFalse: closeInvoiceModal
    } = useBoolean(false);

    const createInvoiceTypes = useMemo<ButtonDropdownItem[]>(
        () => [
            {
                label: "Sprzedaży",
                to: "/management-panel/document-creator"
            }
        ],
        []
    );

    const columns = useMemo<MRT_ColumnDef<Invoice>[]>(
        () => [
            {
                accessorKey: "number",
                header: "Numer"
            },
            {
                accessorKey: "contractor.fullName",
                header: "Kontrahent"
            },
            {
                accessorKey: "invoiceType",
                header: "Typ"
            },
            {
                accessorKey: "issueDate",
                header: "Data wystawienia"
            },
            {
                accessorKey: "paid",
                header: "Opłacona"
            }
        ],
        []
    );

    return (
        <>
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={12}>
                    <ButtonDropdown label={"Wystaw fakture"} items={createInvoiceTypes} />
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        data={[]}
                        columns={columns}
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
            {/* {
                invoiceModal
                    ? <DocumentCreator isOpen={invoiceModal} onClose={closeInvoiceModal} />
                    : null
            } */}
        </>
    )
}

export default Invoices;