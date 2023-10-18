import React from "react";
import {createBrowserRouter, createRoutesFromElements, Route,} from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import NotFoundPage from "../pages/NotFoundPage";
import MainLayout from "../layouts/MainLayout";
import Employees from "../pages/Employees";
import Holidays from "../pages/Holidays";
import UserProfile from "../pages/account/UserProfile";
import UserPrivacy from "../pages/account/UserPrivacy";
import AccountLayout from "../layouts/AccountLayout";
import Articles from "../pages/Articles";
import Account from "../pages/account/Account";
import EmployeeDetails from "../pages/employee/EmployeeDetails";
import EmployeeLayout from "../layouts/EmployeeLayout";
import EmployeeAbsence from "../pages/employee/EmployeeAbsence";
import EmployeeContracts from "../pages/employee/EmployeeContracts";
import Contracts from "../pages/Contracts";
import GoodsReceiveNote from "../pages/GoodsReceiveNote";
import BackgroundLayout from "../layouts/BackgroundLayout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<MainPage/>}/>
            <Route path="management-panel" element={<MainLayout/>}>
                <Route path="" element={<AccountLayout/>}>
                    <Route path="account" element={<Account/>}/>
                    <Route path="account/profile" element={<UserProfile/>}/>
                    <Route path="account/privacy" element={<UserPrivacy/>}/>
                </Route>
                <Route path="employee" element={<EmployeeLayout/>}>
                    <Route path="details" element={<EmployeeDetails/>}/>
                    <Route path="absence" element={<EmployeeAbsence/>}/>
                    <Route path="contracts" element={<EmployeeContracts/>}/>
                </Route>
                <Route element={<BackgroundLayout/>}>
                    <Route path={"pz"} element={<GoodsReceiveNote/>}/>
                </Route>
                <Route path="employees" element={<Employees/>}/>
                <Route path="articles" element={<Articles/>}/>
                <Route path="holiday" element={<Holidays/>}/>
                <Route path="contracts" element={<Contracts/>}/>
            </Route>
            <Route path="*" element={<NotFoundPage/>}/>
        </>
    )
);

export default router;
