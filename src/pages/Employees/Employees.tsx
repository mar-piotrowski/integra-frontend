import {MRT_ColumnDef} from "material-react-table";
import React, {useMemo, useState} from "react";
import {
    Box,
    Button,
    Grid,
    ListItemIcon,
    ListItemText,
    MenuItem,
} from "@mui/material";
import ModalUser from "./modals/CreateEmployee/ModalUser";
import ShowAmount from "../../components/ShowAmount";
import CustomTable from "../../components/CustomTable";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {UserDto} from "../../api/types/userTypes";
import {useUsers} from "../../hooks/employee/useUsers";
import {useNavigate} from "react-router-dom";
import {useBoolean} from "../../hooks/useBoolean";
import ModalDeleteUser from "../../features/modals/ModalDeleteUser";

const Employees = () => {
    const {
        value: createEmployeeModal,
        setTrue: openCreateEmployeeModal,
        setFalse: closeCreateEmployeeModal
    } = useBoolean();
    const {
        value: deleteEmployeeModal,
        setTrue: openDeleteEmployeeModal,
        setFalse: closeDeleteEmployeeModal
    } = useBoolean();
    const {data: users} = useUsers();
    const navigate = useNavigate();
    const [user, setUser] = useState<UserDto | null>(null);

    const columns = useMemo<MRT_ColumnDef<UserDto>[]>(
        () => [
            {
                accessorKey: "firstname",
                header: "Imię",
                size: 150,
            },
            {
                accessorKey: "lastname",
                header: "Nazwisko",
                size: 150,
            },
            {
                accessorKey: "jobPosition",
                header: "Stanowisko",
                size: 200,
            },
            {
                accessorKey: "email",
                header: "Email",
                size: 150,
            }
        ],
        []
    );

    const handleOnCloseAddUserModal = () => {
        closeCreateEmployeeModal();
        setUser(null);
    }

    const handleOnCloseDeleteUserModal = () => {
        closeDeleteEmployeeModal();
        setUser(null);
    }

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={12} md={3} lg={6}>
                        <Button
                            variant="contained"
                            disableElevation
                            onClick={openCreateEmployeeModal}
                        >
                            Dodaj pracownika
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTable
                            muiTableBodyRowProps={({row}) => ({
                                onClick: () => navigate(`/management-panel/employee/${row.original.id}/details`),
                                sx: {cursor: "pointer"}
                            })}
                            columns={columns}
                            data={users ?? []}
                            enableRowActions
                            renderRowActionMenuItems={({row, closeMenu}) => [
                                <MenuItem key="edit" onClick={() => {
                                    closeMenu();
                                    setUser(row.original);
                                    openCreateEmployeeModal();
                                }}>
                                    <ListItemIcon>
                                        <EditOutlinedIcon/>
                                    </ListItemIcon>
                                    <ListItemText>Edytuj</ListItemText>
                                </MenuItem>,
                                <MenuItem key="delete" onClick={() => {
                                    closeMenu();
                                    setUser(row.original);
                                    openDeleteEmployeeModal();
                                }}>
                                    <ListItemIcon>
                                        <DeleteOutlineOutlinedIcon/>
                                    </ListItemIcon>
                                    <ListItemText>Usuń</ListItemText>
                                </MenuItem>,
                            ]}
                        />
                    </Grid>
                </Grid>
            </Box>
            {
                createEmployeeModal
                    ? <ModalUser
                        open={createEmployeeModal}
                        onClose={handleOnCloseAddUserModal}
                        user={user}
                    />
                    : null
            }
            {
                deleteEmployeeModal
                ? <ModalDeleteUser
                        isOpen={deleteEmployeeModal}
                        onClose={handleOnCloseDeleteUserModal}
                        userId={user!.id}
                    />
                    : null
            }
        </>
    );
};

export default Employees;
