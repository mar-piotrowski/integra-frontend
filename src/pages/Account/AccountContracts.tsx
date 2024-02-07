import CustomTable from "../../components/CustomTable";
import {Grid} from "@mui/material";
import React, {useMemo, useState} from "react";
import {MRT_ColumnDef} from "material-react-table";
import useGetContracts from "../../hooks/contract/useGetContracts";
import {ContractDto} from "../../api/types/documentTypes";
import {toDateString} from "../../utils/dateHelper";
import {contractTypeMapper} from "../../constants/mappers";
import ContractStatus from "../../components/ContractStatus";
import ContractDetailsModal from "../../features/modals/contractDetails/ContractDetailsModal";
import useAuth from "../../hooks/auth/useAuth";
import {useBoolean} from "../../hooks/useBoolean";


const AccountContracts = () => {
    const {auth} = useAuth();
    const {data: contracts} = useGetContracts(auth!.userId);
    const [contract, setContract] = useState<ContractDto | null>(null);
    const {
        value: contractDetailsModal,
        setTrue: openContractDetailsModal,
        setFalse: closeContractDetailsModal
    } = useBoolean(false);

    const columns = useMemo<MRT_ColumnDef<ContractDto>[]>(
        () => [
            {
                header: "Status",
                Cell: ({row}) => <ContractStatus status={row.original.status}/>,
                size: 100
            },
            {
                accessorKey: "contractType",
                header: "Typ",
                Cell: ({row}) => <div>{contractTypeMapper(row.original.contractType)}</div>
            },
            {
                accessorKey: "salaryWithTax",
                header: "Wynagrodzenie brutto"
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


    const handleCloseDetailsContractModal = () => {
        closeContractDetailsModal();
        setContract(null);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <CustomTable
                        columns={columns}
                        enableRowActions
                        data={contracts ?? []}
                        muiTableBodyRowProps={({row}) => ({
                            onClick: () => {
                                setContract(row.original);
                                handleOpenDetailsContractModal();
                            },
                            sx: {cursor: "pointer"}
                        })}
                    />
                </Grid>
            </Grid>
            {
                contractDetailsModal
                    ? <ContractDetailsModal
                        isOpen={openContractDetailsModal}
                        onClose={handleCloseDetailsContractModal}
                        contract={contract!}
                    />
                    : null
            }
        </>
    )
}

export default AccountContracts;