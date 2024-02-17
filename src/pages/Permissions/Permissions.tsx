import { Grid, Button, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import React, { useMemo, useState } from "react";
import CustomTable from "../../components/CustomTable";
import ShowAmount from "../../components/ShowAmount";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { MRT_ColumnDef } from "material-react-table";
import useJobPositions from "../../hooks/jobPositions/useJobPositions";

const Permissions = () => {
    const [jobPositionEdit, setJobPositionEdit] = useState<JobPosition | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const { data: jobPositions } = useJobPositions();

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
            header: "Kod"
        },
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
                        Dodaj uprawnienie
                    </Button>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={3}>
                    <ShowAmount label="Ilośc uprawnień" value={1} color="blue" />
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        columns={columns}
                        data={[]}
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
        </>
    );
};

export default Permissions;