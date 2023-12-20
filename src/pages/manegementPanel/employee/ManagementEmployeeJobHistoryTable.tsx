import React, { useMemo, useState } from "react";
import { Button, Grid, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import CustomTable from "../../../components/CustomTable";
import { MRT_ColumnDef } from "material-react-table";
import { JobHistoryDto } from "../../../api/types/documentTypes";
import EmployeeJobHistoryModal from "../../../features/modals/EmployeeJobHistoryModal";
import { toDateString } from "../../../utils/dateHelper";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteJobHistoryDialog from "../../../features/dialog/DeleteJobHistoryDialog";
import useGetJobHistories from "../../../hooks/workHistory/useGetJobHistories";
import useAuth from "../../../hooks/auth/useAuth";

const ManagementEmployeeJobHistoryTable = () => {
    const { auth } = useAuth();
    const { data: jobHistories } = useGetJobHistories(auth?.userId);
    const [jobHistoryToEdit, setJobHistoryToEdit] = useState<JobHistoryDto | null>(null);
    const [workHistoryModal, setWorkHistoryModal] = useState<boolean>(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    const handleOpenModal = () => setWorkHistoryModal(true);
    const handleCloseModal = () => {
        setWorkHistoryModal(false);
        setJobHistoryToEdit(null);
    }
    const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setJobHistoryToEdit(null);
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
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button variant={"contained"} onClick={handleOpenModal}>Dodaj historię
                        zatrudnienia</Button>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        columns={columns}
                        data={jobHistories?.data ?? []}
                        enableRowActions
                        renderRowActionMenuItems={({ closeMenu, row }) => [
                            <MenuItem key="edit" onClick={() => {
                                setJobHistoryToEdit(row.original);
                                handleOpenModal();
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
                open={openDeleteDialog}
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

export default ManagementEmployeeJobHistoryTable;