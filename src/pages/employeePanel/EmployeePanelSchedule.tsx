import React from "react";
import Schedule from "../../features/Schedule";
import useAuth from "../../hooks/auth/useAuth";

const EmployeePanelSchedule = () => {
    const { auth } = useAuth();
    return (
        <Schedule userId={auth!.userId} manage={false} />
    );
};

export default EmployeePanelSchedule;