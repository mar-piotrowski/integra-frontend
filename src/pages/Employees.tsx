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
import ModalAddEmployee from "../features/modals/addEmployee/ModalAddEmployee";
import ShowAmount from "../components/ShowAmount";
import CustomTable from "../components/CustomTable";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {UserDto} from "../api/types/userTypes";
import {useGetEmployees} from "../hooks/employee/useGetEmployees";

const Employees = () => {
    const [employeeModal, setEmployeeModal] = useState<boolean>(false);
    const {data: employees} = useGetEmployees();
    const columns = useMemo<MRT_ColumnDef<UserDto>[]>(
        () => [
            {
                accessorKey: "firstname",
                header: "First Name",
                size: 150,
            },
            {
                accessorKey: "lastname",
                header: "Last Name",
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

    const openModalHandler = () => setEmployeeModal(true);

    const closeModalHandler = () => setEmployeeModal(false);

    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={2}>
                    <Grid item xs={6} sm={12} md={3} lg={6}>
                        <Button
                            variant="contained"
                            disableElevation
                            onClick={openModalHandler}
                        >
                            Dodaj pracownika
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={2}>
                        <ShowAmount label="Ilość pracowników" value={100} color="blue"/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={2}>
                        <ShowAmount label="Aktywnych" value={100} color="green"/>
                    </Grid>
                    <Grid item xs={12} sm={12} md={3} lg={2}>
                        <ShowAmount label="Nieaktywnych" value={100} color="red"/>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTable
                            columns={columns}
                            data={employees ?? []}
                            renderRowActionMenuItems={() => [
                                <MenuItem key="edit" onClick={() => console.info("Edit")}>
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
            {employeeModal ? (
                <ModalAddEmployee open={employeeModal} onClose={closeModalHandler}/>
            ) : null}
        </>
    );
};

export default Employees;
