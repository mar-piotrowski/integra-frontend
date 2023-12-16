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
import EmployeeSchedule from "../pages/employee/EmployeeSchedule";
import Salaries from "../pages/Salaries";
import EmployeePanelAbsence from "../pages/employee/EmployeePanelAbsence";
import EmployeePanelLayout from "../layouts/EmployeePanelLayout";
import EmployeePanelWorkingTime from "../pages/employee/EmployeePanelWorkingTime";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProtectedRoute, {Protect} from "./ProtectedRoute";
import {Roles} from "../constants/roles";
import Unauthorized from "../pages/Unauthorized";
import PersistLogin from "../components/PersistLogin";
import Logout from "../pages/Logout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="*" element={<NotFoundPage/>}/>
            <Route path="/" element={<MainPage/>}/>
            <Route path="unauthorized" element={<Unauthorized/>}/>
            <Route path="management/login" element={<Login type={"management"}/>}/>
            <Route path="employee/login" element={<Login type={"employee"}/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="logout" element={<Logout/>}/>
            <Route element={<PersistLogin/>}>
                <Route
                    element={<ProtectedRoute allowedPermissions={[Roles.Employee, Roles.Admin]} type={Protect.Login}/>}>
                    <Route path="employee-panel" element={<MainLayout type={"employee"}/>}>
                        <Route path="working-time" element={<EmployeePanelWorkingTime/>}/>
                        <Route element={<EmployeePanelLayout/>}>
                            <Route path="schedule" element={<EmployeeSchedule editable={false}/>}/>
                            <Route path="absence" element={<EmployeePanelAbsence/>}/>
                        </Route>
                    </Route>
                </Route>
                <Route
                    element={
                        <ProtectedRoute
                            allowedPermissions={[Roles.PanelAccess, Roles.Admin, Roles.ExternalUser]}
                            type={Protect.Login}/>
                    }>
                    <Route path="management-panel" element={<MainLayout type={"management"}/>}>
                        <Route element={<AccountLayout/>}>
                            <Route path="account" element={<Account/>}/>
                            <Route path="account/profile" element={<UserProfile/>}/>
                            <Route path="account/privacy" element={<UserPrivacy/>}/>
                        </Route>
                        <Route path="employee" element={<EmployeeLayout/>}>
                            <Route path="working-time" element={<EmployeeSchedule editable={true}/>}/>
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
                        <Route element={<ProtectedRoute allowedPermissions={[11]} type={Protect.Login}/>}>
                            <Route path="employees" element={<Employees/>}/>
                        </Route>
                        <Route path="articles" element={<Articles/>}/>
                        <Route path="holiday" element={<Holidays/>}/>
                        <Route path="contracts" element={<Contracts/>}/>
                        <Route path="contractors" element={<Contractors/>}/>
                        <Route path="salaries" element={<Salaries/>}/>
                    </Route>
                </Route>
            </Route>
        </>
    )
);

export default router;
