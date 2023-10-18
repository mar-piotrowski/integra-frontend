import {Button, Grid, ListItemIcon, ListItemText, MenuItem} from "@mui/material";
import CustomTable from "../components/CustomTable";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import React, {useMemo, useState} from "react";
import {MRT_ColumnDef} from "material-react-table";
import {UserContract} from "../constants/models";
import ModalAddEmployeeContract from "../features/modals/addEmployeeContract/ModalAddEmployeeContract";

const userContractMockData: UserContract[] = [
    {
        type: "Zlecenie",
        firstname: "Juzek",
        lastname: "Wozek",
        workingTimeType: "Pełen etat",
        startDate: "2023-01-01",
        endDate: "2023-01-01",
        salary: 1234
    }
]

const Contracts = () => {
    const [addContractModal, setAddContractModal] = useState<boolean>(false);
    const columns = useMemo<MRT_ColumnDef<UserContract>[]>(
        () => [
            {
                accessorKey: "type",
                header: "Typ"
            },
            {
                accessorKey: "workingTimeType",
                header: "Wymiar"
            },
            {
                accessorKey: "startDate",
                header: "Od"
            },
            {
                accessorKey: "endDate",
                header: "Do"
            },
            {
                accessorKey: "salary",
                header: "Wynagrodzenie"
            }
        ],
        []
    );

    const openAddContractModal = () => setAddContractModal(true);

    const closeAddContractModal = () => setAddContractModal(false);

    return (
        <>
            <Grid sx={{flexGrow: 1}} container spacing={2}>
                <Grid item container>
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={openAddContractModal}
                    >
                        Dodaj umowę
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        columns={columns}
                        data={userContractMockData}
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
            <ModalAddEmployeeContract open={addContractModal} onClose={closeAddContractModal}/>
        </>
    )
}

export default Contracts;