import useAuth from "../hooks/auth/useAuth";
import {Navigate, Outlet} from "react-router-dom";
import React from "react";
import {decodeToken} from "../utils/authUtils";

export enum Protect {
    Login,
    Module
}

interface ProtectedRouteProps {
    allowedPermissions: number[],
    type: Protect
}

const ProtectedRoute = ({allowedPermissions, type = Protect.Login}: ProtectedRouteProps) => {
    const {auth} = useAuth();

    const verifyRolePermission = () => {
        if(auth?.accessToken == undefined)
            return null
        const details = decodeToken(auth?.accessToken);
        if (
            type == Protect.Module
            && details?.roles.find(role => allowedPermissions.includes(role)) != undefined
            && details?.modules.find(role => allowedPermissions.includes(role)) != undefined
        ) return true;
        return details?.roles.find(role => allowedPermissions.includes(role)) != undefined;
    }

    const permissionResolver = () => {
        if (auth == null)
            return <Navigate to={"management/login"}/>
        if (verifyRolePermission())
            return <Outlet/>
        return <Navigate to={"/unauthorized"}/>
    }

    return permissionResolver();
}

export default ProtectedRoute;