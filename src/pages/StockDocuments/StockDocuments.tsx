import {Grid} from "@mui/material";
import React, {useMemo} from "react";
import ButtonDropdown, {ButtonDropdownItem} from "../../components/Buttons/ButtonDropdown";
import CustomTable from "../../components/CustomTable";
import {MRT_ColumnDef} from "material-react-table";
import {Invoice} from "../../constants/models";

const documentMenuItems: ButtonDropdownItem[] = [
    {
        label: "Wydanie zewnetrzne",
        to: "/management-panel/document-wz"
    },
    {
        label: "Rozchód wewnętrzny",
        to: "/management-panel/document-rw"
    },
    {
        label: "Przyjęcie wewnętrzne",
        to: "/management-panel/document-pw"
    },
    {
        label: "Przyjęcie zewnętrzne",
        to: "/management-panel/document-pz"
    },
    {
        label: "Przeniesienie magazynowe",
        to: "/management-panel/document-mm"
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
                    <ButtonDropdown label={"Wystaw dokument"} items={documentMenuItems}/>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <CustomTable
                    columns={columns}
                    data={[]}
                    enableRowActions
                    // renderRowActionMenuItems={({ row, closeMenu }) => [
                    //     <MenuItem key="edit" onClick={() => {
                    //         closeMenu();
                    //     }}>
                    //         <ListItemIcon>
                    //             <EditOutlinedIcon />
                    //         </ListItemIcon>
                    //         <ListItemText>Edytuj</ListItemText>
                    //     </MenuItem>,
                    //     <MenuItem key="delete" onClick={() => {
                    //         closeMenu();
                    //     }}>
                    //         <ListItemIcon>
                    //             <DeleteOutlineOutlinedIcon />
                    //         </ListItemIcon>
                    //         <ListItemText>Usuń</ListItemText>
                    //     </MenuItem>,
                    // ]}
                    // muiTableBodyRowProps={({ row }) => ({
                    //     onClick: () => { },
                    //     sx: { cursor: "pointer" }
                    // })}
                />
            </Grid>
        </Grid>
    );
};

export default StockDocuments;