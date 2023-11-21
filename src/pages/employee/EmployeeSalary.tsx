import React, {useMemo} from "react";
import {Grid} from "@mui/material";
import CustomTable from "../../components/CustomTable";
import {MRT_ColumnDef} from "material-react-table";

interface EmployeeSalary {
    date: string;
    salary: number;
    totalBonus: number;
}

const EmployeeSalary = () => {
    const columns = useMemo<MRT_ColumnDef<EmployeeSalary>[]>(
        () => [
            {
                accessorKey: "date",
                header: "Data"
            },
            {
                accessorKey: "salary",
                header: "Wypłata"
            },
            {
                accessorKey: "totalBonus",
                header: "Suma bonusów"
            }
        ],
        []
    )
    return (
        <Grid container>
            <Grid item xs={12}>
                <CustomTable
                    columns={columns}
                    data={[]}
                />
            </Grid>
        </Grid>
    )
}

export default EmployeeSalary;