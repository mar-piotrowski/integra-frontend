import CustomTable from "../../components/CustomTable";
import { Button, Grid, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import React, { useMemo, useState } from "react";
import { MRT_ColumnDef } from "material-react-table";
import useGetContracts from "../../hooks/contract/useGetContracts";
import { ContractDto, ContractStatusType } from "../../api/types/documentTypes";
import { toDateString } from "../../utils/dateHelper";
import { contractTypeMapper } from "../../constants/mappers";
import { useNavigate, useParams } from "react-router-dom";
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ContractStatus from "../../components/ContractStatus";
import TerminateContractModal from "../../features/modals/TerminateContractModal";
import ContractDetailsModal from "../../features/modals/contractDetails/ContractDetailsModal";
import HeaderAction from "../../components/HeaderAction";
import { errorToast } from "../../utils/toastUtil";

const ManagementEmployeeContracts = () => {
    const [openTermianteContractModal, setOpenTerminateContractModal] = useState<boolean>(false);
    const [openDetailsContractModal, setOpenDetailsContractModal] = useState<boolean>(false);
    const [contract, setContract] = useState<ContractDto | null>(null);

    const params = useParams();

    const { data: contracts } = useGetContracts(parseInt(params.userId!));

    const navigate = useNavigate();

    const columns = useMemo<MRT_ColumnDef<ContractDto>[]>(
        () => [
            {
                header: "Status",
                Cell: ({ row }) => <ContractStatus status={row.original.status} />,
                size: 100
            },
            {
                accessorKey: "contractType",
                header: "Typ",
                Cell: ({ row }) => <div>{contractTypeMapper(row.original.contractType)}</div>
            },
            {
                accessorKey: "salaryWithTax",
                header: "Wynagrodzenie brutto"
            },
            {
                accessorKey: "workingHours1",
                header: "Wymiar",
                Cell: ({ row }) => <div>{row.original.workingHours1}/{row.original.workingHours2}</div>
            },
            {
                accessorKey: "startDate",
                header: "Od",
                Cell: ({ row }) => <div>{toDateString(row.original.startDate)}</div>
            },
            {
                accessorKey: "endDate",
                header: "Do",
                Cell: ({ row }) => <div>{row.original.endDate != null ? toDateString(row.original.endDate) : "brak"}</div>
            },
        ],
        []
    );

    const handleOpenTerminateContractModal = () => setOpenTerminateContractModal(true);

    const handleCloseTerminateContractModal = () => {
        setOpenTerminateContractModal(false);
        setContract(null);
    }

    const handleOpenDetailsContractModal = () => setOpenDetailsContractModal(true);

    const handleCloseDetailsContractModal = () => {
        setOpenDetailsContractModal(false);
        setContract(null);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <HeaderAction title="Umowy">
                        <Button
                            variant="contained"
                            disableElevation
                            onClick={() => {

                                navigate(`/management-panel/employee/${params.userId}/contract/create`, { replace: true })
                            }}
                        >
                            Dodaj umowę
                        </Button>
                    </HeaderAction>
                </Grid>
                <Grid item xs={12}>
                    <CustomTable
                        columns={columns}
                        enableRowActions
                        data={contracts ?? []}
                        muiTableBodyRowProps={({ row }) => ({
                            onClick: () => {
                                setContract(row.original);
                                handleOpenDetailsContractModal();
                            },
                            sx: { cursor: "pointer" }
                        })}
                        renderRowActionMenuItems={({ closeMenu, row }) => [
                            <MenuItem key="edit" onClick={() => {
                                closeMenu();
                                if (row.original.status == ContractStatusType.NotActive) {
                                    errorToast("Podana umowa została zakończona!")
                                    return;
                                }
                                navigate(`/management-panel/employee/${params.userId}/contract/${row.original.id}/change`, { replace: true })
                            }}>
                                <ListItemIcon>
                                    <EditOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText>Aneks</ListItemText>
                            </MenuItem>,
                            <MenuItem key="termiante" onClick={() => {
                                closeMenu();
                                if (row.original.status == ContractStatusType.NotActive) {
                                    errorToast("Podana umowa została zakończona!")
                                    return;
                                }
                                setContract(row.original);
                                handleOpenTerminateContractModal();
                            }}>
                                <ListItemIcon>
                                    <BlockOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText>Rozwiąż</ListItemText>
                            </MenuItem>
                        ]}
                    />
                </Grid>
            </Grid>
            {
                openTermianteContractModal
                    ? <TerminateContractModal
                        isOpen={openTermianteContractModal}
                        onClose={handleCloseTerminateContractModal}
                        contractId={contract!.id}
                    />
                    : null
            }
            {
                openDetailsContractModal
                    ? <ContractDetailsModal
                        isOpen={openDetailsContractModal}
                        onClose={handleCloseDetailsContractModal}
                        contract={contract!}
                    />
                    : null
            }
        </>
    )
}

export default ManagementEmployeeContracts;