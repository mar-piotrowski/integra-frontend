import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import MainPage from "../pages/main/MainPage";
import React from "react";
import NotFoundPage from "../pages/NotFoundPage";
import MainLayout from "../layouts/MainLayout";
import Employees from "../pages/Employees";
import Holidays from "../pages/Holidays";
import UserProfile from "../pages/account/UserProfile";
import UserPrivacy from "../pages/account/UserPrivacy";
import MiniLayout from "../layouts/MiniLayout";
import Articles from "../pages/Articles";

const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<MainPage/>}/>
                <Route path="management-panel" element={<MainLayout/>}>
                    <Route path="account" element={<MiniLayout/>}>
                        <Route path="profile" element={<UserProfile/>}/>
                        <Route path="privacy" element={<UserPrivacy/>}/>
                    </Route>
                    <Route path="employees" element={<Employees/>}/>
                    <Route path="articles" element={<Articles/>}/>
                    <Route path="holiday" element={<Holidays/>}/>
                </Route>
                <Route path="*" element={<NotFoundPage/>}/>
            </>,
        ),
    )
;

export default router;
