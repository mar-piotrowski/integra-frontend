import React from "react";
import { Grid } from "@mui/material";
import useGetEmployee from "../../../hooks/employee/useGetEmployee";
import { useParams } from "react-router-dom";
import EmployeeDetails from "../../../features/employee/EmployeeDetails";
import EmployeePermissions from "../../../features/employee/EmployeePermissions";
import CustomTable from "../../../components/CustomTable";


const ManagementEmployeeDetails = () => {
    const { userId } = useParams();
    const { data: employee } = useGetEmployee(parseInt(userId!));

    return (
        <Grid container spacing={4}>
            <Grid item xs={6}>
                <EmployeeDetails employee={employee} />
            </Grid>
            <Grid item xs={6}>
                <EmployeePermissions permissions={[]} manage />
            </Grid>
        </Grid>
    )
};

export default ManagementEmployeeDetails;