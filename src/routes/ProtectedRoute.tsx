import useAuth from "../hooks/auth/useAuth";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import { decodeToken } from "../utils/authUtils";


interface ProtectedRouteProps {
    allowedPermissions: number[],
}

const ProtectedRoute = ({ allowedPermissions }: ProtectedRouteProps) => {
    const { auth } = useAuth();

    const verifyRolePermission = () => {
        if (auth?.accessToken == undefined)
            return null
        const details = decodeToken(auth?.accessToken);
        return details?.permissions.find(role => allowedPermissions.includes(role)) != undefined;
    }

    const permissionResolver = () => {
        if (auth == null)
            return <Navigate to={"choose-login"} />
        if (verifyRolePermission())
            return <Outlet />
        return <Navigate to={"/unauthorized"} />
    }

    return permissionResolver();
}

export default ProtectedRoute;