import { Box, Grid } from "@mui/material";
import React, { useMemo } from "react";
import { ContractDto } from "../../../../api/types/documentTypes";
import { MRT_ColumnDef } from "material-react-table";
import CustomTable from "../../../../components/CustomTable";
import useGetContractChanges from "../../../../hooks/contract/useGetContractChanges";
import { toDateString } from "../../../../utils/dateHelper";
import { contractTypeMapper } from "../../../../constants/mappers";
import ContractDetailsBase from "./ContractDetailsBase";

interface ContractDetailsHistoryProps {
    contract: ContractDto;
}

const ContractDetailsHistory = ({ contract }: ContractDetailsHistoryProps) => {
    const { data: changes } = useGetContractChanges(contract.id);
    console.log(changes);
    const columns = useMemo<MRT_ColumnDef<ContractDto>[]>(() => [
        {
            header: "ID",
            accessorKey: "id",
            size: 50
        },
        {
            header: "Typ",
            accessorKey: "contractType",
            size: 300,
            Cell: ({ row }) => <div>{contractTypeMapper(row.original.contractType)}</div>
        },
        {
            header: "Data podpisania",
            accessorKey: "signedOnDate",
            Cell: ({ row }) => <div>{row.original.signedOnDate != null ? toDateString(row.original.signedOnDate) : "brak"}</div>
        },
        {
            header: "Data rozpoczęcia",
            accessorKey: "startDate",
            Cell: ({ row }) => <div>{row.original.startDate != null ? toDateString(row.original.startDate) : "brak"}</div>

        },
        {
            header: "Data zakończenia",
            accessorKey: "endDate",
            Cell: ({ row }) => <div>{row.original.endDate != null ? toDateString(row.original.endDate) : "brak"}</div>
        }
    ], [])

    return (
        <Grid container>
            <Grid item>
                <CustomTable
                    columns={columns}
                    data={changes ?? []}
                    renderDetailPanel={({ row }) => (<ContractDetailsBase contract={row.original} />)}
                />
            </Grid>
        </Grid>
    );
};

export default ContractDetailsHistory;