import React, { useEffect } from "react";
import useLogout from "../../hooks/auth/useLogout";
import { Navigate } from "react-router-dom";

const Logout = () => {

    const { mutate } = useLogout();

    useEffect(() => {
        mutate();
    }, []);

    return <Navigate to={"/"} />;
}

export default Logout;