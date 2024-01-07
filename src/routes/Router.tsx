import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import MainLayout from "../layouts/MainLayout";
import Employees from "../pages/manegementPanel/Employees";
import Holidays from "../pages/manegementPanel/Holidays";
import Profile from "../pages/account/Profile";
import Privacy from "../pages/account/Privacy";
import AccountLayout from "../layouts/AccountLayout";
import Articles from "../pages/manegementPanel/Articles";
import Account from "../pages/account/Account";
import ManagementEmployeeDetails from "../pages/manegementPanel/employee/ManagementEmployeeDetails";
import ManagementEmployeeTabs from "../pages/manegementPanel/employee/ManagementEmployeeTabs";
import ManagementEmployeeAbsences from "../pages/manegementPanel/employee/ManagementEmployeeAbsences";
import ManagementEmployeeContracts from "../pages/manegementPanel/employee/ManagementEmployeeContracts";
import Contracts from "../pages/manegementPanel/Contracts";
import PZ from "../pages/manegementPanel/documents/PZ";
import BackgroundLayout from "../layouts/BackgroundLayout";
import Contractors from "../pages/manegementPanel/Contractors";
import WZ from "../pages/manegementPanel/documents/WZ";
import RW from "../pages/manegementPanel/documents/RW";
import MM from "../pages/manegementPanel/documents/MM";
import Invoices from "../pages/manegementPanel/Invoices";
import ManagementEmployeeDocuments from "../pages/manegementPanel/employee/ManagementEmployeeDocuments";
import ManagementEmployeeSalary from "../pages/manegementPanel/employee/ManagementEmployeeSalary";
import ManagementEmployeeSchedule from "../pages/manegementPanel/employee/ManagementEmployeeSchedule";
import Salaries from "../pages/Salaries";
import EmployeePanelAbsences from "../pages/employeePanel/EmployeePanelAbsences";
import EmployeePanelLayout from "../layouts/EmployeePanelLayout";
import EmployeePanelWorkingTime from "../pages/employeePanel/EmployeePanelWorkingTime";
import Register from "../pages/main/Register";
import Login from "../pages/main/Login";
import ProtectedRoute, { Protect } from "./ProtectedRoute";
import { Roles } from "../constants/roles";
import Unauthorized from "../pages/Unauthorized";
import PersistLogin from "../components/PersistLogin";
import Logout from "../pages/main/Logout";
import MainPage from "../pages/main/MainPage";
import ManagementPanelSettings from "../pages/manegementPanel/setttings/ManagementPanelSettings";
import JobPositions from "../pages/manegementPanel/JobPositions";
import CreateContract from "../pages/manegementPanel/CreateContract";
import EmployeePanelDocumentTabs from "../pages/employeePanel/EmployeePanelDocumentTabs";
import EmployeePanelContracts from "../pages/employeePanel/EmployeePanelContracts";
import EmployeePanelDocuments from "../pages/employeePanel/EmployeePanelDocuments";
import EmployeePanelSalaries from "../pages/employeePanel/EmployeePanelSalaries";
import ChangeContract from "../pages/manegementPanel/ChangeContract";
import ChooseLogin from "../pages/main/chooseLogin/ChooseLogin";
import Permissions from "../pages/manegementPanel/Permissions";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/" element={<MainPage />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="management-panel/login" element={<Login type={"management"} />} />
            <Route path="employee-panel/login" element={<Login type={"employee"} />} />
            <Route path="register" element={<Register />} />
            <Route path="logout" element={<Logout />} />
            <Route path="choose-login" element={<ChooseLogin />} />
            <Route element={<PersistLogin />}>
                <Route
                    element={<ProtectedRoute allowedPermissions={[Roles.Employee, Roles.Admin]} type={Protect.Login} />}>
                    <Route path="employee-panel" element={<MainLayout type={"employee"} />}>
                        <Route path="working-time" element={<EmployeePanelWorkingTime />} />
                        <Route path="salaries" element={<EmployeePanelSalaries />} />
                        <Route element={<EmployeePanelLayout />}>
                            <Route path="schedule" element={<ManagementEmployeeSchedule editable={false} />} />
                            <Route path="absence" element={<EmployeePanelAbsences />} />
                        </Route>
                        <Route path="documents" element={<EmployeePanelDocumentTabs />}>
                            <Route path="contracts" element={<EmployeePanelContracts />} />
                            <Route path="other" element={<EmployeePanelDocuments />} />
                        </Route>
                    </Route>
                </Route>
                <Route
                    element={
                        <ProtectedRoute
                            allowedPermissions={[Roles.PanelAccess, Roles.Admin, Roles.ExternalUser]}
                            type={Protect.Login} />
                    }>
                    <Route path="management-panel" element={<MainLayout type={"management"} />}>
                        <Route element={<AccountLayout />}>
                            <Route path="account" element={<Account />} />
                            <Route path="account/profile" element={<Profile />} />
                            <Route path="account/privacy" element={<Privacy />} />
                        </Route>
                        <Route path="employee/:userId" element={<ManagementEmployeeTabs />} >
                            <Route index path="details" element={<ManagementEmployeeDetails />} />
                            <Route path="working-time" element={<ManagementEmployeeSchedule editable={true} />} />
                            <Route path="documents" element={<ManagementEmployeeDocuments />} />
                            <Route path="absence" element={<ManagementEmployeeAbsences />} />
                            <Route path="contracts" element={<ManagementEmployeeContracts />} />
                            <Route path="salary" element={<ManagementEmployeeSalary />} />
                        </Route>
                        <Route path="employee/:userId/contract" element={<BackgroundLayout />}>
                            <Route path="create" element={<CreateContract />} />
                        </Route>
                        <Route path="employee/:userId/contract/:contractId" element={<BackgroundLayout />}>
                            <Route path="change" element={<ChangeContract />} />
                        </Route>
                        <Route element={<BackgroundLayout />}>
                            <Route path={"pz"} element={<PZ />} />
                            <Route path={"pw"} element={<WZ />} />
                            <Route path={"wz"} element={<WZ />} />
                            <Route path={"rw"} element={<RW />} />
                            <Route path={"mm"} element={<MM />} />
                        </Route>
                        <Route path="invoices" element={<Invoices />} />
                        {/* <Route element={<ProtectedRoute allowedPermissions={[]} type={Protect.Login}/>}> */}
                        <Route path="employees" element={<Employees />} />
                        {/* </Route> */}
                        <Route path="articles" element={<Articles />} />
                        <Route path="holiday" element={<Holidays />} />
                        <Route path="contracts" element={<Contracts />} />
                        <Route path="contractors" element={<Contractors />} />
                        <Route path="salaries" element={<Salaries />} />
                        <Route path="settings">
                            <Route path="" element={<ManagementPanelSettings />} />
                            <Route path="job-positions" element={<JobPositions />} />
                            <Route path="permissions" element={<Permissions />} />
                        </Route>
                    </Route>
                </Route>
            </Route>
        </>
    )
);

export default router;
