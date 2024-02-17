import React, { useMemo, useState } from "react";
import { Button, Grid, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import CustomTable from "../../components/CustomTable";
import { MRT_ColumnDef } from "material-react-table";
import { SchoolHistoryDto } from "../../api/types/documentTypes";
import EmployeeSchoolHistoryModal from "../../features/modals/EmployeeSchoolHistoryModal";
import useGetSchoolHistories from "../../hooks/schoolHistory/useGetSchoolHistories";
import { toDateString } from "../../utils/dateHelper";
import { schoolDegreeMapper } from "../../constants/mappers";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DeleteSchoolHistoryDialog from "../../features/dialog/DeleteSchoolHistoryDialog";
import HeaderAction from "../../components/HeaderAction";
import { useParams } from "react-router-dom";

const ProfileUserSchoolHistory = () => {
    const { userId } = useParams();
    const { data: schoolHistories } = useGetSchoolHistories(parseInt(userId!));
    const [schoolHistoryModal, setSchoolHistoryModal] = useState<boolean>(false);
    const [schoolHistoryToEdit, setSchoolHistoryToEdit] = useState<SchoolHistoryDto | null>(null);
    const [openDialogDelete, setOpenDialogDelete] = useState(false);

    const handleOpenModal = () => setSchoolHistoryModal(true);
    const handleCloseModal = () => {
        setSchoolHistoryModal(false);
        setSchoolHistoryToEdit(null);
    }
    const handleOpenDialogDelete = () => setOpenDialogDelete(true);
    const handleCloseDialogDelete = () => {
        setOpenDialogDelete(false);
        setSchoolHistoryToEdit(null);
    }

    const columns = useMemo<MRT_ColumnDef<SchoolHistoryDto>[]>(
        () => [
            {
                accessorKey: "schoolName",
                header: "Szkoła"
            },
            {
                accessorKey: "specialization",
                header: "Specjalizacja",
                Cell: ({ row }) => <div>{row.original.specialization == null ? "Brak" : row.original.specialization}</div>
            },
            {
                accessorKey: "title",
                header: "Tytuł",
                Cell: ({ row }) => <div>{row.original.title == null ? "Brak" : row.original.title}</div>
            },
            {
                accessorKey: "degree",
                header: "Stopień",
                Cell: ({ row }) => <div>{schoolDegreeMapper(row.original.degree)}</div>
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
            },
        ],
        []
    );

    return (
        <>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <HeaderAction title="Historia wyksztacenia">
                        <Button
                            disableElevation
                            variant={"contained"}
                            onClick={handleOpenModal}>
                            Dodaj wykształcenie
                        </Button>
                    </HeaderAction>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        enableTopToolbar={false}
                        columns={columns}
                        data={schoolHistories ?? []}
                        enableRowActions
                        renderRowActionMenuItems={({ closeMenu, row }) => [
                            <MenuItem key="edit" onClick={() => {
                                setSchoolHistoryToEdit(row.original);
                                handleOpenModal();
                                closeMenu();
                            }}>
                                <ListItemIcon>
                                    <EditOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText>Edytuj</ListItemText>
                            </MenuItem>,
                            <MenuItem key="delete" onClick={() => {
                                setSchoolHistoryToEdit(row.original);
                                handleOpenDialogDelete();
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
            <DeleteSchoolHistoryDialog
                isOpen={openDialogDelete}
                onClose={handleCloseDialogDelete}
                schoolHistoryId={schoolHistoryToEdit != null ? schoolHistoryToEdit.id : -1}
            />
            <EmployeeSchoolHistoryModal
                open={schoolHistoryModal}
                onClose={handleCloseModal}
                schoolHistory={schoolHistoryToEdit} />
        </>
    )
}

export default ProfileUserSchoolHistory;