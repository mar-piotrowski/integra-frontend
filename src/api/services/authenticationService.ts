import { LoginForm } from "../../pages/main/Login";
import { RegisterForm } from "../../pages/main/register/Register";
import axios from "../axios";
import {ChangePasswordRequest} from "../types/authTypes";
import endpoint from "../endpoint";

const authenticationService = {
    login: async (login: LoginForm) => await axios.post("/auth/login", login),
    register: async (register: RegisterForm) => await axios.post("/auth/register", register),
    logout: async () => await axios.post("/auth/logout"),
    refreshToken: async (accessToken: string) => await axios.post("/auth/refresh-token", accessToken),
    changePassword: async (changePassword: ChangePasswordRequest) =>
        await axios.post(`${endpoint.authentication}/change-password`, changePassword)
};

export default authenticationService;