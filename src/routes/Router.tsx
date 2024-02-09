import React from "react";
import {createBrowserRouter, createRoutesFromElements, Route,} from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import MainLayout from "../layouts/MainLayout";
import Employees from "../pages/Employees/Employees";
import Absences from "../pages/Absences/Absences";
import AccountPrivacy from "../pages/Account/AccountPrivacy";
import AccountLayout from "../layouts/AccountLayout";
import Articles from "../pages/Articles/Articles";
import AccountDetails from "../pages/Account/AccountDetails";
import ProfileUserDetails from "../pages/ProfileUser/ProfileUserDetails";
import ProfileUser from "../pages/ProfileUser/ProfileUser";
import ProfileUserAbsences from "../pages/ProfileUser/ProfileUserAbsences";
import ProfileUserContracts from "../pages/ProfileUser/ProfileUserContracts";
import Contracts from "../pages/Contracts/Contracts";
import BackgroundLayout from "../layouts/BackgroundLayout";
import Contractors from "../pages/Contractors/Contractors";
import Invoices from "../pages/Invoices/Invoices";
import ProfileUserDocuments from "../pages/ProfileUser/ProfileUserDocuments";
import ProfileUserSchedule from "../pages/ProfileUser/ProfileUserSchedule";
import EmployeePanelAbsences from "../pages/employeePanel/EmployeePanelAbsences";
import EmployeePanelLayout from "../layouts/EmployeePanelLayout";
import EmployeePanelWorkingTime from "../pages/employeePanel/EmployeePanelWorkingTime";
import Register from "../pages/main/register/Register";
import Login from "../pages/main/Login";
import ProtectedRoute from "./ProtectedRoute";
import {Permission} from "../constants/permission";
import Unauthorized from "../pages/Unauthorized";
import PersistLogin from "../components/PersistLogin";
import Logout from "../pages/main/Logout";
import MainPage from "../pages/main/MainPage";
import Settings from "../pages/Settings/Settings";
import JobPositions from "../pages/JobPositions/JobPositions";
import CreateContract from "../pages/CreateContract/CreateContract";
import EmployeePanelDocumentTabs from "../pages/employeePanel/EmployeePanelDocumentTabs";
import EmployeePanelContracts from "../pages/employeePanel/EmployeePanelContracts";
import EmployeePanelDocuments from "../pages/employeePanel/EmployeePanelDocuments";
import ChangeContract from "../pages/ChangeContract/ChangeContract";
import ChooseLogin from "../pages/main/chooseLogin/ChooseLogin";
import Permissions from "../pages/Permissions/Permissions";
import Schedules from "../pages/Schedules/Schedules";
import ScheduleSchemas from "../pages/ScheduleSchemas/ScheduleSchemas";
import EmployeePanelSchedule from "../pages/employeePanel/EmployeePanelSchedule";
import StockDocuments from "../pages/StockDocuments/StockDocuments";
import DocumentInvoice from "../pages/Documents/Invoice/DocumentInvoice";
import DocumentMM from "../pages/Documents/MM/DocumentMM";
import DocumentPz from "../pages/Documents/PZ/DocumentPz";
import DocumentWz from "../pages/Documents/WZ/DocumentWz";
import AccountSchedule from "../pages/Account/AccountSchedule";
import AccountAbsences from "../pages/Account/AccountAbsences";
import AccountDocuments from "../pages/Account/AccountDocuments";
import AccountContracts from "../pages/Account/AccountContracts";
import Stocks from "../pages/Stocks/Stocks";
import DocumentEditPz from "../pages/Documents/PZ/DocumentEditPz";
import DocumentEditMM from "../pages/Documents/MM/DocumentEditMM";
import DocumentEditWz from "../pages/Documents/WZ/DocumentEditWz";
import DocumentEditInvoice from "../pages/Documents/Invoice/DocumentEditInvoice";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="*" element={<NotFoundPage/>}/>
            <Route path="/" element={<MainPage/>}/>
            <Route path="unauthorized" element={<Unauthorized/>}/>
            <Route path="management-panel/login" element={<Login type={"management"}/>}/>
            <Route path="employee-panel/login" element={<Login type={"employee"}/>}/>
            <Route path="register" element={<Register/>}/>
            <Route path="logout" element={<Logout/>}/>
            <Route path="choose-login" element={<ChooseLogin/>}/>
            <Route element={<PersistLogin/>}>
                <Route path="employee-panel" element={<MainLayout type={"employee"}/>}>
                    <Route path="account" element={<AccountLayout type={"employee"}/>}>
                        <Route path="" element={<AccountDetails/>}/>
                        <Route path="privacy" element={<AccountPrivacy/>}/>
                    </Route>
                    <Route path="working-time" element={<EmployeePanelWorkingTime/>}/>
                    <Route element={<EmployeePanelLayout/>}>
                        <Route path="schedule" element={<EmployeePanelSchedule/>}/>
                        <Route path="absence" element={<EmployeePanelAbsences/>}/>
                    </Route>
                    <Route path="documents" element={<EmployeePanelDocumentTabs/>}>
                        <Route path="contracts" element={<EmployeePanelContracts/>}/>
                        <Route path="other" element={<EmployeePanelDocuments/>}/>
                    </Route>
                </Route>
                <Route element={<ProtectedRoute allowedPermissions={[Permission.FullAccess, Permission.MgPanel]}/>}>
                    <Route path="management-panel" element={<MainLayout type={"management"}/>}>
                        <Route path="account" element={<AccountLayout type={"panel"}/>}>
                            <Route path="" element={<AccountDetails/>}/>
                            <Route path="schedule" element={<AccountSchedule/>}/>
                            <Route path="absences" element={<AccountAbsences/>}/>
                            <Route path="documents" element={<AccountDocuments/>}/>
                            <Route path="contracts" element={<AccountContracts/>}/>
                            <Route path="privacy" element={<AccountPrivacy/>}/>
                        </Route>
                        <Route element={<ProtectedRoute
                            allowedPermissions={[Permission.FullAccess, Permission.HrAll, Permission.HrEmployees]}/>}>
                            <Route path="employees" element={<Employees/>}/>
                            <Route path="employee/:userId" element={<ProfileUser/>}>
                                <Route index path="details" element={<ProfileUserDetails/>}/>
                                <Route path="schedule" element={<ProfileUserSchedule/>}/>
                                <Route path="documents" element={<ProfileUserDocuments/>}/>
                                <Route path="absence" element={<ProfileUserAbsences/>}/>
                                <Route path="contracts" element={<ProfileUserContracts/>}/>
                            </Route>
                        </Route>
                        <Route path="stocks" element={<Stocks/>}/>
                        <Route element={<ProtectedRoute
                            allowedPermissions={[Permission.FullAccess, Permission.HrAll, Permission.HrSchedules]}/>}>
                            <Route path="stock-documents" element={<StockDocuments/>}/>
                            <Route element={<BackgroundLayout/>}>
                                <Route path="document-pz" element={<DocumentPz/>}/>
                                <Route path="document-wz" element={<DocumentWz/>}/>
                                <Route path="document-mm" element={<DocumentMM/>}/>
                                <Route path="document-pz/:documentId/edit" element={<DocumentEditPz/>}/>
                                <Route path="document-wz/:documentId/edit" element={<DocumentEditWz/>}/>
                                <Route path="document-mm/:documentId/edit" element={<DocumentEditMM/>}/>
                            </Route>
                        </Route>
                        <Route element={<ProtectedRoute
                            allowedPermissions={[Permission.FullAccess, Permission.HrAll, Permission.HrSchedules]}/>}>
                            <Route path="schedules" element={<Schedules/>}/>
                        </Route>
                        <Route element={<ProtectedRoute
                            allowedPermissions={[Permission.FullAccess, Permission.HrAll, Permission.HrHolidays]}/>}>
                            <Route path="holiday" element={<Absences/>}/>
                        </Route>
                        <Route element={<ProtectedRoute
                            allowedPermissions={[Permission.FullAccess, Permission.HrAll, Permission.DocDocuments]}/>}>
                            <Route path="invoices" element={<Invoices/>}/>
                            <Route element={<BackgroundLayout/>}>
                                <Route path="document-invoice" element={<DocumentInvoice/>}/>
                                <Route path="document-invoice/:documentId/edit" element={<DocumentEditInvoice/>}/>
                            </Route>
                        </Route>
                        <Route element={<ProtectedRoute
                            allowedPermissions={[Permission.FullAccess, Permission.HrAll, Permission.HrContracts]}/>}>
                            <Route path="contracts" element={<Contracts/>}/>
                            <Route path="employee/:userId/contract" element={<BackgroundLayout/>}>
                                <Route path="create" element={<CreateContract/>}/>
                            </Route>
                            <Route path="employee/:userId/contract/:contractId" element={<BackgroundLayout/>}>
                                <Route path="change" element={<ChangeContract/>}/>
                            </Route>
                        </Route>
                        <Route element={<ProtectedRoute
                            allowedPermissions={[Permission.FullAccess, Permission.DocContractors]}/>}>
                            <Route path="contractors" element={<Contractors/>}/>
                        </Route>
                        <Route element={<ProtectedRoute
                            allowedPermissions={[Permission.FullAccess, Permission.StProducts]}/>}>
                            <Route path="articles" element={<Articles/>}/>
                        </Route>
                        <Route path="settings">
                            <Route path="" element={<Settings/>}/>
                            <Route path="job-positions" element={<JobPositions/>}/>
                            <Route path="permissions" element={<Permissions/>}/>
                            <Route path="schedule-schemas" element={<ScheduleSchemas/>}/>
                        </Route>
                    </Route>
                </Route>
            </Route>
        </>
    )
);

export default router;
