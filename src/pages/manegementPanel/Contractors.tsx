import { Button, Grid, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import React, { useMemo, useState } from "react";
import ShowAmount from "../../components/ShowAmount";
import { MRT_ColumnDef } from "material-react-table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CustomTable from "../../components/CustomTable";
import ContactorModal from "../../features/modals/addContractor/ContactorModal";
import useGetContractors from "../../hooks/contractor/useGetContractors";
import { ContractorDto } from "../../api/types/contractorTypes";
import { useBoolean } from "../../hooks/useBoolean";
import ContractorDetailsModal from "../../features/ContractorDetailsModal";

const Contractors = () => {
    const { data: contractors } = useGetContractors();
    const [contractorDetails, setContractorDetails] = useState<ContractorDto | null>(null);
    const {
        value: detailsModal,
        setFalse: handleCloseDetailsModal,
        setTrue: handleOpenDetailsModal
    } = useBoolean(false);
    const {
        value: createModal,
        setFalse: handleCloseCreateModal,
        setTrue: handleOpenCreateModal
    } = useBoolean();

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

    const handleExtendCloseCreateModal = () => {
        handleCloseCreateModal();
        setContractorDetails(null);
    }

    return (
        <>
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Grid item xs={10}>
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={handleOpenCreateModal}
                    >
                        Dodaj kontrahenta
                    </Button>
                </Grid>
                <Grid item xs={2}>
                    <ShowAmount label="Ilość kontrahentów" value={100} color="blue" />
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        columns={columns}
                        enableRowActions
                        data={contractors?.data.contractors ?? []}
                        muiTableBodyRowProps={({ row }) => ({
                            onClick: () => {
                                setContractorDetails(row.original);
                                handleOpenDetailsModal();
                            },
                            sx: { cursor: "pointer" }
                        })}
                        renderRowActionMenuItems={({ row, closeMenu }) => [
                            <MenuItem key="edit" onClick={() => {
                                handleOpenCreateModal();
                                setContractorDetails(row.original);
                                closeMenu();
                            }}>
                                <ListItemIcon>
                                    <EditOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText>Edytuj</ListItemText>
                            </MenuItem>,
                            <MenuItem key="delete" onClick={() => console.info("Delete")}>
                                <ListItemIcon>
                                    <DeleteOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText>Usuń</ListItemText>
                            </MenuItem>
                        ]}
                    />
                </Grid>
            </Grid>
            {
                detailsModal
                    ? <ContractorDetailsModal isOpen={detailsModal} onClose={handleCloseDetailsModal} contractor={contractorDetails!} />
                    : null
            }
            {
                createModal
                    ? <ContactorModal open={createModal} onClose={handleExtendCloseCreateModal} contractorUpdate={contractorDetails} />
                    : null
            }
        </>
    );
}

export default Contractors;