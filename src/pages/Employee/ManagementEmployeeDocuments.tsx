import { Grid } from "@mui/material";
import React from "react";
import ManagementEmployeeSchoolHistoryTable from "./ManagementEmployeeSchoolHistoryTable";
import ManagementEmployeeJobHistoryTable from "./ManagementEmployeeJobHistoryTable";

const ManagementEmployeeDocuments = () => {
    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <ManagementEmployeeJobHistoryTable />
            </Grid>
            <Grid item xs={12}>
                <ManagementEmployeeSchoolHistoryTable />
            </Grid>
        </Grid>
    )
}

export default ManagementEmployeeDocuments;