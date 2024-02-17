import { Box } from "@mui/system";
import CustomPageTabs, { CustomTabItem } from "../../components/CustomPageTabs";
import React from "react";
import { Outlet } from "react-router-dom";

const tabs: CustomTabItem[] = [
    {
        link: "/employee-panel/documents/contracts",
        title: "Umowy"
    },
    {
        link: "/employee-panel/documents/other",
        title: "Inne"
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
            <CustomPageTabs tabs={tabs} />
            <Box sx={{ padding: "10px" }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default EmployeePanelDocumentTabs;