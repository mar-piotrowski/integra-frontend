import React, { useMemo } from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { UserWorkingTime } from "../../constants/models";
import { MRT_ColumnDef } from "material-react-table";
import CustomTable from "../../components/CustomTable";

interface CustomBoxProps {
    children: JSX.Element | JSX.Element[];
}

const mockData = [
    {
        date: "342",
        start: "334",
        end: 'das',
        hours: 123
    }
]

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

const EmployeePanelWorkingTime = () => {
    // const columnsWorkingTime = useMemo<MRT_ColumnDef<UserWorkingTime>>(() => [
    //     {
    //         accessorKey: "date",
    //         header: "Dzień"
    //     },
    //     {
    //         accessorKey: "start",
    //         header: "Rozpoczęcie"
    //     },
    //     {
    //         accessorKey: "end",
    //         header: "Zakończenie"
    //     },
    //     {
    //         accessorKey: "hours",
    //         header: "Liczba godzin"
    //     }
    // ], [])

    return (
        <Grid container spacing={2}>
            <Grid item container spacing={2}>
                <Grid item xs={12} md={4}>
                    <CustomBox>
                        <Typography variant={"subtitle1"}> Aktualny miesiac</Typography>
                        <Typography variant={"subtitle1"} color={"green"}> 160 godzin </Typography>
                    </CustomBox>
                </Grid>
                <Grid item xs={12} md={4}>
                    <CustomBox>
                        <Typography variant={"subtitle1"}>Pozostalo</Typography>
                        <Typography variant={"subtitle1"} color={"red"}>8 godzin</Typography>
                    </CustomBox>
                </Grid>
                <Grid item xs={12} md={4}>
                    <CustomBox>
                        <Typography variant={"subtitle1"}>Nadgodziny</Typography>
                        <Typography variant={"subtitle1"} color={"blue"}>0 godzin</Typography>
                    </CustomBox>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <CustomTable
                    columns={[]}
                    data={mockData}
                />
            </Grid>
        </Grid>
    )
}

export default EmployeePanelWorkingTime;