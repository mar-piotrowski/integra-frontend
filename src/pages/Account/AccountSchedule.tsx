import React from "react";
import Schedule from "../../features/Schedule/Schedule";
import useAuth from "../../hooks/auth/useAuth";

const AccountSchedule = () => {
    const {auth} = useAuth();
    return <Schedule userId={auth!.userId} manage={false}/>
}

export default AccountSchedule;