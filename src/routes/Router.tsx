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
import PZ from "../pages/documents/PZ";
import BackgroundLayout from "../layouts/BackgroundLayout";
import Contractors from "../pages/Contractors";
import WZ from "../pages/documents/WZ";
import RW from "../pages/documents/RW";
import MM from "../pages/documents/MM";
import Invoices from "../pages/Invoices";
import EmployeeDocuments from "../pages/employee/EmployeeDocuments";
import EmployeeSalary from "../pages/employee/EmployeeSalary";
import EmployeeWorkingPlan from "../pages/employee/EmployeeWorkingPlan";
import Salaries from "../pages/Salaries";

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
                    <Route path="working-time" element={<EmployeeWorkingPlan/>}/>
                    <Route path="details" element={<EmployeeDetails/>}/>
                    <Route path="documents" element={<EmployeeDocuments/>}/>
                    <Route path="absence" element={<EmployeeAbsence/>}/>
                    <Route path="contracts" element={<EmployeeContracts/>}/>
                    <Route path="salary" element={<EmployeeSalary/>}/>
                </Route>
                <Route element={<BackgroundLayout/>}>
                    <Route path={"pz"} element={<PZ/>}/>
                    <Route path={"pw"} element={<WZ/>}/>
                    <Route path={"wz"} element={<WZ/>}/>
                    <Route path={"rw"} element={<RW/>}/>
                    <Route path={"mm"} element={<MM/>}/>
                </Route>
                <Route path="invoices" element={<Invoices/>}/>
                <Route path="employees" element={<Employees/>}/>
                <Route path="articles" element={<Articles/>}/>
                <Route path="holiday" element={<Holidays/>}/>
                <Route path="contracts" element={<Contracts/>}/>
                <Route path="contractors" element={<Contractors/>}/>
                <Route path="salaries" element={<Salaries/>}/>
            </Route>
            <Route path="*" element={<NotFoundPage/>}/>
        </>
    )
);

export default router;
