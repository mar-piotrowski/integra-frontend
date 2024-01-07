import { Grid, Typography } from "@mui/material";
import React from "react";
import EmployeePanelJobHistoriesTable from "./EmployeePanelJobHistoriesTable";
import EmployeePanelSchoolHistoriesTable from "./EmployeePanelSchoolHistoriesTable";

const EmployeePanelDocuments = () => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4">Historia zatrudnienia</Typography>
            </Grid>
            <Grid item xs={12}>
                <EmployeePanelJobHistoriesTable />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4">Historia wykształcenia</Typography>
            </Grid>
            <Grid item xs={12}>
                <EmployeePanelSchoolHistoriesTable />
            </Grid>
        </Grid>
    );
};

export default EmployeePanelDocuments;