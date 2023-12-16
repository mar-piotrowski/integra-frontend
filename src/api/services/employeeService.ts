import {CreateUser} from "../types/userTypes";
import endpoint from "../endpoint";
import AxiosPrivate from "../../hooks/auth/axiosPrivate";
import axios from "../axios";

// const axios = AxiosPrivate();

const employeeService = {
    getAll: async () => await axios.get(endpoint.users),
    get: async (employeeId: number) => await axios.get(`/${endpoint.users}/${employeeId}`),
    create: async (employee: CreateUser) => await axios.post(endpoint.users, employee),
    update: async (employeeId: number, employee: CreateUser) => await axios.put(`/${endpoint.users}/${employeeId}`, employee),
}

export default employeeService;