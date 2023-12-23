import { Grid, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import React, { useMemo, useState } from "react";
import { ContractDto } from "../../api/types/documentTypes";
import ContractStatus from "../../components/ContractStatus";
import CustomTable from "../../components/CustomTable";
import { contractTypeMapper } from "../../constants/mappers";
import useAuth from "../../hooks/auth/useAuth";
import useGetContracts from "../../hooks/contract/useGetContracts";
import { toDateString } from "../../utils/dateHelper";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ContentPasteOffOutlinedIcon from '@mui/icons-material/ContentPasteOffOutlined';
import SignContractModal from "../../features/modals/SingContractModal";
import ContractDetailsModal from "../../features/modals/ContractDetailsModal";

const EmployeePanelContracts = () => {
    const [openSignContractModal, setOpenSignContractModal] = useState<boolean>(false);
    const [openDetailsContractModal, setOpenDetailsContractModal] = useState<boolean>(false);
    const { auth } = useAuth();
    const [contract, setContract] = useState<ContractDto | null>(null);
    const { data: contracts } = useGetContracts(auth?.userId);

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

    const handleOpenSignContractModal = () => setOpenSignContractModal(true);

    const handleCloseSignContractModal = () => setOpenSignContractModal(false);

    const handleOpenDetailsContractModal = () => setOpenDetailsContractModal(true);

    const handleCloseDetailsContractModal = () => {
        setOpenDetailsContractModal(false)
        setContract(null);
    };

    return (
        <>
            <Grid container spacing={2}>
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
                            <MenuItem key="Podpisz" onClick={() => {
                                closeMenu();
                                setContract(row.original);
                                handleOpenSignContractModal();
                            }}>
                                <ListItemIcon>
                                    <ModeEditOutlineOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText>Podpisz</ListItemText>
                            </MenuItem>,
                            <MenuItem key="cancel" onClick={() => {
                                closeMenu();
                            }}>
                                <ListItemIcon>
                                    <ContentPasteOffOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText>Wypowiedz</ListItemText>
                            </MenuItem>,
                        ]}
                    />
                </Grid>
            </Grid>
            {
                openSignContractModal
                    ? <SignContractModal
                        isOpen={openSignContractModal}
                        onClose={handleCloseSignContractModal}
                        contract={contract!} />
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

export default EmployeePanelContracts;