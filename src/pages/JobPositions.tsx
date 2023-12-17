import { MRT_ColumnDef } from "material-react-table";
import React, { useMemo, useState } from "react";
import CustomTable from "../components/CustomTable";
import { MenuItem, ListItemIcon, ListItemText, Button, Grid } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import JobPositionModal from "../features/modals/JobPositionModal";
import useGetJobPositions from "../hooks/jobPositions/useGetJobPositions";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ShowAmount from "../components/ShowAmount";

const JobPositions = () => {

    const [jobPositionEdit, setJobPositionEdit] = useState<JobPosition | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const { data: jobPositions } = useGetJobPositions();

    const columns = useMemo<MRT_ColumnDef<JobPosition>[]>(() => [
        {
            accessorKey: "id",
            header: "ID"
        },
        {
            accessorKey: "title",
            header: "Nazwa"
        },
        {
            header: "Ilosc osob"
        },
        {
            header: "Srednie wynagrodzenie"
        }
    ], [])

    const handleOpenModal = () => setOpenModal(true);

    const handleCloseModal = () => setOpenModal(false);

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6} sm={12} md={8} lg={9}>
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={handleOpenModal}
                    >
                        Dodaj staniwisko
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={3}>
                    <ShowAmount label="Ilość pracowników" value={jobPositions?.length} color="blue" />
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        columns={columns}
                        data={jobPositions ?? []}
                        enableRowActions
                        renderRowActionMenuItems={({ closeMenu, row }) => [
                            <MenuItem key="edit" onClick={() => {
                                setJobPositionEdit(row.original);
                                closeMenu();
                                handleOpenModal();
                            }}>
                                <ListItemIcon>
                                    <EditOutlinedIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Edytuj</ListItemText>
                            </MenuItem>,
                            <MenuItem key="delete" onClick={() => console.info("Delete")}>
                                <ListItemIcon>
                                    <DeleteOutlineOutlinedIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Usun</ListItemText>
                            </MenuItem>,
                        ]}
                    />
                </Grid>
            </Grid>
            {openModal ? <JobPositionModal isOpen={openModal} onClose={handleCloseModal} jobPositionEdit={jobPositionEdit} /> : null}
        </>
    );
};

export default JobPositions;