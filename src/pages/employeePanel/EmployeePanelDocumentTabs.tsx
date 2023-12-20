import { Box } from "@mui/system";
import CustomTabs, { CustomTabItem } from "../../components/CustomTabs";
import React from "react";
import { Outlet } from "react-router-dom";

const tabs: CustomTabItem[] = [
    {
        link: "/employee-panel/documents",
        title: "Dokumenty"
    },
    {
        link: "/employee-panel/contracts",
        title: "Umowy"
    }
]
const EmployeePanelDocumentTabs = () => {
    return (
        <Box
            sx={{
                backgroundColor: "white",
                padding: "25px",
                borderRadius: "10px",
                gap: "20px",
            }}
        >
            <CustomTabs tabs={tabs} />
            <Box sx={{ padding: "10px" }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default EmployeePanelDocumentTabs;