import React, { useMemo, useState } from "react";
import { Button, Grid, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import CustomTable from "../../components/CustomTable";
import { MRT_ColumnDef } from "material-react-table";
import { JobHistoryDto } from "../../api/types/documentTypes";
import EmployeeJobHistoryModal from "../../features/modals/EmployeeJobHistoryModal";
import { toDateString } from "../../utils/dateHelper";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteJobHistoryDialog from "../../features/dialog/DeleteJobHistoryDialog";
import useGetJobHistories from "../../hooks/workHistory/useGetJobHistories";
import HeaderAction from "../../components/HeaderAction";
import { useParams } from "react-router-dom";

const ProfileUserJobHistory = () => {
    const { userId } = useParams();
    const { data: jobHistories } = useGetJobHistories(parseInt(userId!));
    const [jobHistoryToEdit, setJobHistoryToEdit] = useState<JobHistoryDto | null>(null);
    const [workHistoryModal, setWorkHistoryModal] = useState<boolean>(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleOpenEditModal = () => setWorkHistoryModal(true);

    const handleOpenModal = () => {
        setJobHistoryToEdit(null);
        setWorkHistoryModal(true)
    }

    const handleCloseModal = () => {
        setJobHistoryToEdit(null);
        setWorkHistoryModal(false);
    }
    const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);

    const handleCloseDeleteDialog = () => {
        setJobHistoryToEdit(null);
        setOpenDeleteDialog(false);
    }

    const columns = useMemo<MRT_ColumnDef<JobHistoryDto>[]>(
        () => [
            {
                accessorKey: "companyName",
                header: "Firma",
            },
            {
                accessorKey: "position",
                header: "Stanowisko"
            },
            {
                accessorKey: "startDate",
                header: "Od",
                Cell: ({ row }) => <div>{toDateString(row.original.startDate)}</div>
            },
            {
                accessorKey: "endDate",
                header: "Do",
                Cell: ({ row }) => <div>{toDateString(row.original.endDate)}</div>
            }
        ],
        []
    );

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <HeaderAction title="Historia zatrudnienia">
                        <Button
                            disableElevation
                            variant={"contained"}
                            onClick={handleOpenModal}>
                            Dodaj historię zatrudnienia
                        </Button>
                    </HeaderAction>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        enableTopToolbar={false}
                        columns={columns}
                        data={jobHistories ?? []}
                        enableRowActions
                        renderRowActionMenuItems={({ closeMenu, row }) => [
                            <MenuItem key="edit" onClick={() => {
                                setJobHistoryToEdit(row.original);
                                handleOpenEditModal();
                                closeMenu();
                            }}>
                                <ListItemIcon>
                                    <EditOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText>Edytuj</ListItemText>
                            </MenuItem>,
                            <MenuItem key="delete" onClick={() => {
                                setJobHistoryToEdit(row.original);
                                handleOpenDeleteDialog();
                                closeMenu();
                            }}>
                                <ListItemIcon>
                                    <DeleteOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText>Usuń</ListItemText>
                            </MenuItem>,
                        ]}
                    />
                </Grid>
            </Grid>
            <DeleteJobHistoryDialog
                isOpen={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                jobHistoryId={jobHistoryToEdit != null ? jobHistoryToEdit.id : -1}
            />
            <EmployeeJobHistoryModal
                open={workHistoryModal}
                onClose={handleCloseModal}
                jobHistory={jobHistoryToEdit}
            />
        </>
    )
}

export default ProfileUserJobHistory;