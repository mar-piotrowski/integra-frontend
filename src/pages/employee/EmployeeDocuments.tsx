import {Grid} from "@mui/material";
import React from "react";
import EmployeeSchoolHistoryTable from "./EmployeeSchoolHistoryTable";
import EmployeeJobHistoryTable from "./EmployeeJobHistoryTable";

const EmployeeDocuments = () => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <EmployeeJobHistoryTable/>
                </Grid>
                <Grid item xs={12}>
                    <EmployeeSchoolHistoryTable/>
                </Grid>
            </Grid>
        </>
    )
}

export default EmployeeDocuments;