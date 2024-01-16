import { Grid } from "@mui/material";
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
            accessorKey: "workingHours1",
            header: "Wymiar",
            Cell: ({ row }) => <div>{row.original.workingHours1}/{row.original.workingHours2}</div>
        },
        {
            accessorKey: "salaryWithTax",
            header: "Wynagrodzenie brutto"
        },
        {
            accessorKey: "salaryWithoutTax",
            header: "Wynagrodzenie netto"
        },
        {
            header: "Data podpisania",
            accessorKey: "signedOnDate",
            Cell: ({ row }) => <div>{row.original.signedOnDate != null ? toDateString(row.original.signedOnDate) : "brak"}</div>
        },
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