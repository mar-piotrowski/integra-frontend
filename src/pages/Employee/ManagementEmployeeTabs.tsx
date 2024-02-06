import React from "react";
import { Box } from "@mui/system";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import CustomPageTabs, { CustomTabItem } from "../../components/CustomPageTabs";
import useGetEmployee from "../../hooks/employee/useGetEmployee";
import ManagementEmployeeNotFound from "./ManagementEmployeeNotFound";

const tabs = [
    {
        title: "Dane pracownika",
        link: "details"
    },
    {
        title: "Grafik",
        link: "schedule"
    },
    {
        title: "Nieobecności",
        link: "absence"
    },
    {
        title: "Dokumenty",
        link: "Documents"
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
    const { userId } = useParams();
    const location = useLocation();
    const { data: user } = useGetEmployee(parseInt(userId!));

    const customTabs: CustomTabItem[] = tabs.map(tab => ({
        title: tab.title,
        link: `/management-panel/employee/${userId}/${tab.link}`
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
                location.pathname == `/management-panel/employee/${userId}`
                    ? <Navigate to={customTabs[0].link} replace={true} />
                    : <CustomPageTabs tabs={customTabs} />
            }
            <Box sx={{ padding: "10px" }}>
                {
                    user != undefined
                        ? <Outlet />
                        : <ManagementEmployeeNotFound />
                }
            </Box>
        </Box>
    );
};

export default ManagementEmployeeTabs;
