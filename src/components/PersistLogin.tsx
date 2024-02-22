import useAuth from "../hooks/auth/useAuth";
import useRefreshToken from "../hooks/auth/useRefreshToken";
import React, {useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import BackdropLoading from "./BackdropLoading";
import {errorToast} from "../utils/toastUtil";
import ErrorPage from "../pages/ErrorPage";
import ChooseLogin from "../pages/main/chooseLogin/ChooseLogin";

const PersistLogin = () => {
    const [fetch, setFetch] = useState(false);
    const {token, query} = useRefreshToken(fetch);
    const {auth, persist} = useAuth();


    useEffect(() => {
        if (!persist)
            return;
        if (query.isError && auth?.accessToken == null) {
            errorToast("Wystąpił błąd z serwerem");
            return;
        }
        if (token != null) setFetch(false); else setFetch(true);
    }, [token, fetch, persist]);


    if (query.isError)
        return <ErrorPage/>

    if (!persist && auth?.accessToken == null)
        return <ChooseLogin/>

    return (
        auth?.accessToken == null
            ? <BackdropLoading text={"Ładowanie"}/>
            : <Outlet/>
    )
}

export default PersistLogin;