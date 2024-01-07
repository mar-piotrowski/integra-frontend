import React, { useEffect } from "react";
import useAuth from "../../hooks/auth/useAuth";
import useLogout from "../../hooks/auth/useLogout";
import { Navigate, useNavigate } from "react-router-dom";

const Logout = () => {
    const { clearAuth, setPersist } = useAuth();
    const navigate = useNavigate();
    const { mutate, isSuccess, isError, isLoading } = useLogout();

    useEffect(() => {
        mutate();
        if (!isSuccess) return;
        clearAuth();
        setPersist(false);
        navigate("/");
    }, [isSuccess, isError, isLoading]);

    return <Navigate to={"/"} />;
}

export default Logout;