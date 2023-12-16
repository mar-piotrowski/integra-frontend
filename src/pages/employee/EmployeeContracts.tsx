import CustomTable from "../../components/CustomTable";
import {Button, Grid, ListItemIcon, ListItemText, MenuItem} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import React, {useMemo, useState} from "react";
import {MRT_ColumnDef} from "material-react-table";
import ModalAddEmployeeContract, {} from "../../features/modals/addEmployeeContract/ModalAddEmployeeContract";
import useGetContracts from "../../hooks/contract/useGetContracts";
import {Contract, ContractDto} from "../../api/types/documentTypes";
import {toDateString} from "../../utils/dateHelper";
import {contractTypeMapper} from "../../constants/mappers";

const EmployeeContracts = () => {
    const {data: contracts} = useGetContracts(1);
    const [addContractModal, setAddContractModal] = useState<boolean>(false);
    const [editContractModal, setEditContractModal] = useState<boolean>(false);
    const [contractToEdit, setContractToEdit] = useState<Contract | null>(null);

    const columns = useMemo<MRT_ColumnDef<ContractDto>[]>(
        () => [
            {
                accessorKey: "contractType",
                header: "Typ",
                Cell: ({row}) => <div>{contractTypeMapper(row.original.contractType)}</div>
            },
            {
                accessorKey: "salary",
                header: "Wynagrodzenie"
            },
            {
                accessorKey: "workingHours1",
                header: "Wymiar",
                Cell: ({row}) => <div>{row.original.workingHours1}/{row.original.workingHours2}</div>
            },
            {
                accessorKey: "startDate",
                header: "Od",
                Cell: ({row}) => <div>{toDateString(row.original.startDate)}</div>
            },
            {
                accessorKey: "endDate",
                header: "Do",
                Cell: ({row}) => <div>{row.original.endDate != null ? toDateString(row.original.endDate) : "brak"}</div>
            },
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
                        enableRowActions
                        data={contracts?.data.contracts ?? []}
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