import CustomTable from "../../components/CustomTable";
import {Button, Grid, ListItemIcon, ListItemText, MenuItem} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import React, {useMemo, useState} from "react";
import {MRT_ColumnDef} from "material-react-table";
import {UserContract} from "../../constants/models";
import ModalAddEmployeeContract, {} from "../../features/modals/addEmployeeContract/ModalAddEmployeeContract";

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

const EmployeeContracts = () => {
    const [addContractModal, setAddContractModal] = useState<boolean>(false);
    const [editContractModal, setEditContractModal] = useState<boolean>(false);
    const [contractToEdit, setContractToEdit] = useState<UserContract | null>(null);

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

    const openAddContractModal = (edit: boolean) => {
        setEditContractModal(edit)
        setAddContractModal(true)
    }

    const closeAddContractModal = () => {
        setAddContractModal(false)
        setEditContractModal(false)
        setContractToEdit(null);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item container>
                    <Button
                        variant="contained"
                        disableElevation
                        onClick={() => {
                            openAddContractModal(false)
                        }}
                    >
                        Dodaj umowę
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        columns={columns}
                        data={userContractMockData}
                        renderRowActionMenuItems={({closeMenu, row}) => [
                            <MenuItem key="edit" onClick={() => {
                                openAddContractModal(true)
                                setContractToEdit(row.original);
                                closeMenu();
                            }}>
                                <ListItemIcon>
                                    <EditOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText>Aneks</ListItemText>
                            </MenuItem>,
                            <MenuItem key="delete" onClick={() => console.info("Delete")}>
                                <ListItemIcon>
                                    <DeleteOutlineOutlinedIcon/>
                                </ListItemIcon>
                                <ListItemText>Usuń</ListItemText>
                            </MenuItem>
                        ]}
                    />
                </Grid>
            </Grid>
            <ModalAddEmployeeContract
                open={addContractModal}
                onClose={closeAddContractModal}
                editContract={editContractModal}
                contract={contractToEdit}
            />
        </>
    )
}

export default EmployeeContracts;