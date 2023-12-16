import {Button, Grid, ListItemIcon, ListItemText, MenuItem} from "@mui/material";
import React, {useMemo, useState} from "react";
import ShowAmount from "../components/ShowAmount";
import {MRT_ColumnDef} from "material-react-table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CustomTable from "../components/CustomTable";
import ContactorModal from "../features/modals/addContractor/ContactorModal";
import useGetContractors from "../hooks/contractor/useGetContractors";
import {ContractorDto, CreateContractorRequest} from "../api/types/contractorTypes";

export type UpdateContractor = {
    id: number;
    contractor: CreateContractorRequest;
}

const Contractors = () => {
    const {data: contractors} = useGetContractors();
    const [contractorModalOpen, setContractorModalOpen] = useState(false);
    const [contractorToEdit, setContractorToEdit] = useState<UpdateContractor | null>(null);
    const columns = useMemo<MRT_ColumnDef<ContractorDto>[]>(
        () => [
            {
                accessorKey: "id",
                header: "Id"
            },
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
    const closeModalHandler = () => {
        setContractorModalOpen(false);
        setContractorToEdit(null);
    }

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
                        data={contractors?.data.contractors ?? []}
                        renderRowActionMenuItems={({row, closeMenu}) => [
                            <MenuItem key="edit" onClick={() => {
                                openModalHandler();
                                setContractorToEdit({
                                    id: row.original.id,
                                    contractor: row.original
                                });
                                closeMenu();
                            }}>
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
            <ContactorModal open={contractorModalOpen} onClose={closeModalHandler} contractorUpdate={contractorToEdit}/>
        </>
    );
}

export default Contractors;