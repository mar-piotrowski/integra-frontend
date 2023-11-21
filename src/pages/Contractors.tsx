import {Button, Grid, ListItemIcon, ListItemText, MenuItem} from "@mui/material";
import React, {useMemo, useState} from "react";
import ShowAmount from "../components/ShowAmount";
import {MRT_ColumnDef} from "material-react-table";
import {Contractor} from "../constants/models";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CustomTable from "../components/CustomTable";
import ModalAddContractor from "../features/modals/addContractor/ModalAddContractor";

const mockContractors: Contractor[] = [];
const Contractors = () => {
    const [contractorModalOpen, setContractorModalOpen] = useState(false);
    const columns = useMemo<MRT_ColumnDef<Contractor>[]>(
        () => [
            {
                accessorKey: "fullName",
                header: "Nazwa"
            },
            {
                accessorKey: "nip",
                header: "Nip"
            },
            {
                accessorKey: "email",
                header: "Email"
            }
        ],
        []
    );
    const openModalHandler = () => setContractorModalOpen(true);
    const closeModalHandler = () => setContractorModalOpen(false);

    return (
        <>
            <Grid sx={{flexGrow: 1}} container spacing={2}>
                <Grid item xs={10}>
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={openModalHandler}
                    >
                        Dodaj kontrahenta
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <ShowAmount label="Ilość kontrahentów" value={100} color="blue"/>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        columns={columns}
                        data={mockContractors}
                        renderRowActionMenuItems={() => [
                            <MenuItem key="edit" onClick={() => console.info("Edit")}>
                                <ListItemIcon>
                                    <EditOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText>Edytuj</ListItemText>
                            </MenuItem>,
                            <MenuItem key="delete" onClick={() => console.info("Delete")}>
                                <ListItemIcon>
                                    <DeleteOutlineOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText>Usuń</ListItemText>
                            </MenuItem>
                        ]}
                    />
                </Grid>
            </Grid>
            <ModalAddContractor open={contractorModalOpen} onClose={closeModalHandler}/>
        </>
    );
}

export default Contractors;