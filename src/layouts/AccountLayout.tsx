import React from "react";
import {Box} from "@mui/system";
import {Outlet} from "react-router-dom";
import CustomPageTabs, {CustomTabItem} from "../components/CustomPageTabs";

const managePanelTabItems: CustomTabItem[] = [
    {
        title: "Dane konta",
        link: "/management-panel/account"
    },
    {
        title: "Grafik",
        link: "/management-panel/account/schedule"
    },
    {
        title: "Czas pracy",
        link: "/management-panel/account/working-times"
    },
    {
        title: "Nieobecności",
        link: "/management-panel/account/absences"
    },
    {
        title: "Dokumenty",
        link: "/management-panel/account/documents"
    },
    {
        title: "Umowy",
        link: "/management-panel/account/contracts"
    },
    {
        title: "Karty",
        link: "/management-panel/account/cards"
    },
    {
        title: "Prywatność",
        link: "/management-panel/account/privacy"
    }
];

const employeePanelTabItems: CustomTabItem[] = [
    {
        title: "Dane konta",
        link: "/employee-panel/account"
    },
    {
        title: "Karty",
        link: "/employee-panel/account/cards"
    },
    {
        title: "Prywatność",
        link: "/employee-panel/account/privacy"
    }
];

interface AccountLayoutProps {
    type: "employee" | "panel"
}

const AccountLayout = ({type}: AccountLayoutProps) => {
    return (
        <Box sx={{backgroundColor: "white", padding: "25px", borderRadius: "10px", gap: "20px",}}>
            <CustomPageTabs tabs={type == "employee" ? employeePanelTabItems : managePanelTabItems}/>
            <Outlet/>
        </Box>
    );
};

export default AccountLayout;