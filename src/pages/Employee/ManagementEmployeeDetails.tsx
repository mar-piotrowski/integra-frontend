import React from "react";
import { Grid } from "@mui/material";
import useGetEmployee from "../../hooks/employee/useGetEmployee";
import { useParams } from "react-router-dom";
import EmployeeDetails from "../../features/employee/EmployeeDetails";
import EmployeePermissions from "../../features/employee/EmployeePermissions";
import useAuth from "../../hooks/auth/useAuth";

const ManagementEmployeeDetails = () => {
    const { userId } = useParams();
    const { data: employee } = useGetEmployee(parseInt(userId!));
    const { auth } = useAuth();

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
                <EmployeeDetails employee={employee} />
            </Grid>
            {
                auth?.permissions.includes(748)
                    ?
                    <Grid item xs={12}>
                        <EmployeePermissions permissions={employee?.permissions} manage />
                    </Grid>
                    : null
            }
        </Grid>
    )
};

export default ManagementEmployeeDetails;