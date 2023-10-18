import React from "react";
import {Box} from "@mui/system";
import {Outlet} from "react-router-dom";
import CustomTabs, {CustomTabItem} from "../components/CustomTabs";

const tabs: CustomTabItem[] = [
    {
        title: "Profil",
        link: "/management-panel/account"
    },
    {
        title: "Prywatność",
        link: "/management-panel/account/privacy"
    }
]

const AccountLayout = () => {
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
            <Outlet/>
        </Box>
    );
};

export default AccountLayout;