import React from "react";
import {Grid} from "@mui/material";
import useAuth from "../../hooks/auth/useAuth";
import useUser from "../../hooks/employee/useUser";
import UserDetails from "../../features/employee/UserDetails";
import UserPermissions from "../../features/employee/UserPermissions";

const AccountDetails = () => {
    const {auth} = useAuth();
    const {data: user} = useUser(auth!.userId);

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
                <UserDetails employee={user!}/>
            </Grid>
            <Grid item xs={12}>
                <UserPermissions
                    permissions={user?.permissions ?? []}
                    manage={user?.permissions.some(permission => permission.code == 748)}
                />
            </Grid>
        </Grid>
    )

}

export default AccountDetails;