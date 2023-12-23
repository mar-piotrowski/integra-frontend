import React, { useEffect } from "react";
import { Box } from "@mui/system";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import CustomTabs, { CustomTabItem } from "../../../components/CustomTabs";
import useAuth from "../../../hooks/auth/useAuth";
import ManagementEmployeeDetails from "./ManagementEmployeeDetails";

const tabs = [
    {
        title: "Dane pracownika",
        link: "details"
    },
    {
        title: "Czas pracy",
        link: "working-time"
    },
    {
        title: "Nieobecności",
        link: "absence"
    },
    {
        title: "Dokumenty",
        link: "documents"
    },
    {
        title: "Umowy",
        link: "contracts"
    },
    {
        title: "Wypłaty",
        link: "salary"
    },
]

const ManagementEmployeeTabs = () => {
    const { auth } = useAuth();
    const location = useLocation();

    const customTabs: CustomTabItem[] = tabs.map(tab => ({
        title: tab.title,
        link: `/management-panel/employee/${auth?.userId}/${tab.link}`
    }))

    return (
        <Box
            sx={{
                backgroundColor: "white",
                padding: "25px",
                borderRadius: "10px",
                gap: "20px",
            }}
        >
            {
                location.pathname == `/management-panel/employee/${auth?.userId}`
                    ? <Navigate to={customTabs[0].link} replace={true} />
                    : <CustomTabs tabs={customTabs} />
            }
            <Box sx={{ padding: "10px" }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default ManagementEmployeeTabs;
