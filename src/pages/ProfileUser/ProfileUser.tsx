import React from "react";
import {Box} from "@mui/system";
import {Navigate, Outlet, useLocation, useParams} from "react-router-dom";
import CustomPageTabs, {CustomTabItem} from "../../components/CustomPageTabs";
import ProfileUserNotFound from "./ProfileUserNotFound";
import useUser from "../../hooks/employee/useUser";

const employeeTabs = [
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
        link: "documents"
    },
    {
        title: "Umowy",
        link: "contracts"
    },
]

const ProfileUser = () => {
    const { userId } = useParams();
    const {data: user } = useUser(parseInt(userId!));
    const location = useLocation();

    const customTabs: CustomTabItem[] = employeeTabs.map(tab => ({
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
                    ? <Navigate to={customTabs[0].link} replace={true}/>
                    : <CustomPageTabs tabs={customTabs}/>
            }
            <Box sx={{padding: "10px"}}>
                {
                    user != undefined
                        ? <Outlet/>
                        : <ProfileUserNotFound/>
                }
            </Box>
        </Box>
    );
};

export default ProfileUser;
