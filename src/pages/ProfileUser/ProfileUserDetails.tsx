import React from "react";
import {Grid} from "@mui/material";
import useUser from "../../hooks/employee/useUser";
import {useParams} from "react-router-dom";
import UserDetails from "../../features/employee/UserDetails";
import UserPermissions from "../../features/employee/UserPermissions";

const ProfileUserDetails = () => {
    const {userId} = useParams();
    const {data: user} = useUser(parseInt(userId!));

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
};

export default ProfileUserDetails;