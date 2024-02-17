import {Button, Grid, ListItemIcon, ListItemText, MenuItem} from "@mui/material";
import React, {useMemo, useState} from "react";
import {MRT_ColumnDef} from "material-react-table";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import CustomTable from "../../components/CustomTable";
import ModalContractor from "../../features/modals/addContractor/ModalContractor";
import useGetContractors from "../../hooks/contractor/useGetContractors";
import {ContractorDto} from "../../api/types/contractorTypes";
import {useBoolean} from "../../hooks/useBoolean";
import ContractorDetailsModal from "../../features/modals/ContractorDetailsModal";
import ModalDeleteContractor from "./components/ModelDeleteContractor";

const Contractors = () => {
    const {data: contractors} = useGetContractors();
    const [contractorDetails, setContractorDetails] = useState<ContractorDto | null>(null);
    const {
        value: detailsModal,
        setTrue: handleOpenDetailsModal,
        setFalse: handleCloseDetailsModal
    } = useBoolean(false);
    const {
        value: createModal,
        setTrue: handleOpenCreateModal,
        setFalse: handleCloseCreateModal
    } = useBoolean();
    const {
        value: deleteModal,
        setTrue: handleOpenDeleteModal,
        setFalse: handleCloseDeleteModal
    } = useBoolean(false)

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

    const handleExtendCloseDetailsModal = () => {
        handleCloseDetailsModal();
        setContractorDetails(null);
    }


    const handleExtendCloseDeleteModal = () => {
        handleCloseDeleteModal();
        setContractorDetails(null);
    }

    return (
        <>
            <Grid sx={{flexGrow: 1}} container spacing={2}>
                <Grid item xs={10}>
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={handleOpenCreateModal}
                    >
                        Dodaj kontrahenta
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        columns={columns}
                        enableRowActions
                        data={contractors ?? []}
                        muiTableBodyRowProps={({row}) => ({
                            onClick: () => {
                                setContractorDetails(row.original);
                                handleOpenDetailsModal();
                            },
                            sx: {cursor: "pointer"}
                        })}
                        renderRowActionMenuItems={({row, closeMenu}) => [
                            <MenuItem key="edit" onClick={() => {
                                handleOpenCreateModal();
                                setContractorDetails(row.original);
                                closeMenu();
                            }}>
                                <ListItemIcon>
                                    <EditOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText>Edytuj</ListItemText>
                            </MenuItem>,
                            <MenuItem key="delete" onClick={() => {
                                handleOpenDeleteModal();
                                setContractorDetails(row.original);
                                closeMenu();
                            }}>
                                <ListItemIcon>
                                    <DeleteOutlineOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText>Usuń</ListItemText>
                            </MenuItem>
                        ]}
                    />
                </Grid>
            </Grid>
            {
                deleteModal
                    ? <ModalDeleteContractor
                        isOpen={deleteModal}
                        onClose={handleExtendCloseDeleteModal}
                        contractorId={contractorDetails!.id}
                    />
                    : null
            }
            {
                detailsModal
                    ? <ContractorDetailsModal
                        isOpen={detailsModal}
                        onClose={handleExtendCloseDetailsModal}
                        contractor={contractorDetails!}
                    />
                    : null
            }
            {
                createModal
                    ? <ModalContractor
                        open={createModal}
                        onClose={handleExtendCloseCreateModal}
                        contractorUpdate={contractorDetails}
                    />
                    : null
            }
        </>
    );
}

export default Contractors;