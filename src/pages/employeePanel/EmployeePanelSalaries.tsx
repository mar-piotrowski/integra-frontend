import { Box, Grid, Typography } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import React, { useMemo } from "react";
import CustomTable from "../../components/CustomTable";

interface EmployeeSalary {
    date: string;
    salary: number;
    totalBonus: number;
}

interface CustomBoxProps {
    children: JSX.Element | JSX.Element[];
}

const CustomBox = ({ children }: CustomBoxProps) => {
    return (
        <Box sx={{
            p: 3,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "white",
            borderRadius: 2
        }}>
            {children}
        </Box>
    );
}

const EmployeePanelSalaries = () => {
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
        <Grid container spacing={2}>
            <Grid item container spacing={2}>
                <Grid item xs={12} md={4}>
                    <CustomBox>
                        <Typography variant={"subtitle1"}> Suma wypłat</Typography>
                        <Typography variant={"subtitle1"} color={"green"}>160 godzin</Typography>
                    </CustomBox>
                </Grid>
                <Grid item xs={12} md={4}>
                    <CustomBox>
                        <Typography variant={"subtitle1"}>Średnia miesięczna</Typography>
                        <Typography variant={"subtitle1"} color={"red"}>8 godzin</Typography>
                    </CustomBox>
                </Grid>
                <Grid item xs={12} md={4}>
                    <CustomBox>
                        <Typography variant={"subtitle1"}>Najlepszy miesiąc</Typography>
                        <Typography variant={"subtitle1"} color={"blue"}>0 godzin</Typography>
                    </CustomBox>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <CustomTable
                    columns={columns}
                    data={[]}
                />
            </Grid>
        </Grid>
    )
}

export default EmployeePanelSalaries;