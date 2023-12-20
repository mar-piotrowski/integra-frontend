import { Grid } from "@mui/material";
import React, { useMemo } from "react";
import CustomTable from "../../components/CustomTable";
import ButtonDropdown, { ButtonDropdownItem } from "../../components/ButtonDropdown";
import { MRT_ColumnDef } from "material-react-table";
import { Invoice } from "../../constants/models";

const createInvoiceTypes: ButtonDropdownItem[] = [
    {
        label: "Sprzedaży",
        to: "/management-panel/invoice-sell"
    }
]

const Invoices = () => {
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
    )
    return (
        <Grid
            sx={{ flexGrow: 1 }}
            container
            spacing={2}
        >
            <Grid item>
                <ButtonDropdown label={"Wystaw fakture"} items={createInvoiceTypes} />
            </Grid>
            <Grid item>
                <CustomTable data={[]} columns={columns} />
            </Grid>
        </Grid>
    )
}

export default Invoices;