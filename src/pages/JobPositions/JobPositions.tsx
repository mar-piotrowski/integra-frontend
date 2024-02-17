import {MRT_ColumnDef} from "material-react-table";
import React, {useMemo, useState} from "react";
import CustomTable from "../../components/CustomTable";
import {MenuItem, ListItemIcon, ListItemText, Button, Grid} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ModalJobPosition from "../../features/modals/ModalJobPosition";
import useJobPositions from "../../hooks/jobPositions/useJobPositions";
import {useBoolean} from "../../hooks/useBoolean";

const JobPositions = () => {
    const [jobPositionEdit, setJobPositionEdit] = useState<JobPosition | null>(null);
    const {
        value: jobPositionModal,
        setTrue: openJobPositionModal,
        setFalse: closeJobPositionModal
    } = useBoolean(false);
    const {data: jobPositions} = useJobPositions();

    const columns = useMemo<MRT_ColumnDef<JobPosition>[]>(() => [
        {
            accessorKey: "id",
            header: "ID"
        },
        {
            accessorKey: "title",
            header: "Nazwa"
        },
    ], [])

    const handleCloseJobPositionModal = () => {
        closeJobPositionModal();
        setJobPositionEdit(null);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6} sm={12} md={8} lg={9}>
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={openJobPositionModal}
                    >
                        Dodaj stanowisko
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        columns={columns}
                        data={jobPositions ?? []}
                        enableRowActions
                        renderRowActionMenuItems={({closeMenu, row}) => [
                            <MenuItem key="edit" onClick={() => {
                                setJobPositionEdit(row.original);
                                closeMenu();
                                openJobPositionModal();
                            }}>
                                <ListItemIcon>
                                    <EditOutlinedIcon fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText>Edytuj</ListItemText>
                            </MenuItem>,
                            <MenuItem key="delete" onClick={() => console.info("Delete")}>
                                <ListItemIcon>
                                    <DeleteOutlineOutlinedIcon fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText>Usun</ListItemText>
                            </MenuItem>,
                        ]}
                    />
                </Grid>
            </Grid>
            <ModalJobPosition
                isOpen={jobPositionModal}
                onClose={handleCloseJobPositionModal}
                jobPositionEdit={jobPositionEdit!}
            />
        </>
    );
};

export default JobPositions;