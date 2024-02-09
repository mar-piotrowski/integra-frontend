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
import ModalAddUser from "./modals/CreateEmployee/ModalAddUser";
import ShowAmount from "../../components/ShowAmount";
import CustomTable from "../../components/CustomTable";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {UserDto} from "../../api/types/userTypes";
import {useUsers} from "../../hooks/employee/useUsers";
import {useNavigate} from "react-router-dom";
import {useBoolean} from "../../hooks/useBoolean";

const Employees = () => {
    const {
        value: createEmployeeModal,
        setTrue: openCreateEmployeeModal,
        setFalse: closeCreateEmployeeModal
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
                    <Grid item xs={12} sm={12} md={3} lg={2}>
                        <ShowAmount label="Ilość pracowników" value={users?.length ?? 0} color="blue"/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={2}>
                        <ShowAmount label="Aktywnych" value={100} color="green"/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={2}>
                        <ShowAmount label="Nieaktywnych" value={100} color="red"/>
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
                                <MenuItem key="delete" onClick={() => console.info("Delete")}>
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
                    ? <ModalAddUser
                        open={createEmployeeModal}
                        onClose={closeCreateEmployeeModal}
                        user={user}
                    />
                    : null
            }
        </>
    );
};

export default Employees;