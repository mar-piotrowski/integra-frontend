import useAuth from "../hooks/auth/useAuth";
import useRefreshToken from "../hooks/auth/useRefreshToken";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import BackdropLoading from "./BackdropLoading";
import { errorToast } from "../utils/toastUtil";

const PersistLogin = () => {
    const [fetch, setFetch] = useState(false);
    const { token, query } = useRefreshToken(fetch);
    const { auth, persist } = useAuth();
    console.log(auth)
    useEffect(() => {
        if (query.isError && auth?.accessToken == null) {
            errorToast("Wystąpił błąd z serwerem");
            return;
        }
        if (token != null) setFetch(false); else setFetch(true);
    }, [token, fetch, persist]);

    return (
        auth?.accessToken == null
            ? <BackdropLoading text={"Ładowanie"} />
            : <Outlet />
    )
}

export default PersistLogin;