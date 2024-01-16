import { LoginForm } from "../../pages/main/Login";
import { RegisterForm } from "../../pages/main/register/Register";
import axios from "../axios";

const authenticationService = {
    login: async (login: LoginForm) => await axios.post("/auth/login", login),
    register: async (register: RegisterForm) => await axios.post("/auth/register", register),
    logout: async () => await axios.post("/auth/logout"),
    refreshToken: async (accessToken: string) => await axios.post("/auth/refresh-token", accessToken)
};

export default authenticationService;