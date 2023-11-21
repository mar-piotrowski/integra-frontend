import React from "react";
import {Box} from "@mui/system";
import {Outlet} from "react-router-dom";
import CustomTabs, {CustomTabItem} from "../components/CustomTabs";

const tabs: CustomTabItem[] = [
    {
        title: "Dane pracownika",
        link: "/management-panel/employee/details"
    },
    {
        title: "Czas pracy",
        link: "/management-panel/employee/working-time"
    },
    {
        title: "Nieobecności",
        link: "/management-panel/employee/absence"
    },
    {
        title: "Dokumenty",
        link: "/management-panel/employee/documents"
    },
    {
        title: "Umowy",
        link: "/management-panel/employee/contracts"
    },
    {
        title: "Wypłaty",
        link: "/management-panel/employee/salary"
    },
]

const EmployeeLayout = () => {
    return (
        <Box
            sx={{
                backgroundColor: "white",
                padding: "25px",
                borderRadius: "10px",
                gap: "20px",
            }}
        >
            <CustomTabs tabs={tabs}/>
            <Box sx={{padding: "10px"}}>
                <Outlet/>
            </Box>
        </Box>
    );
};

export default EmployeeLayout;
