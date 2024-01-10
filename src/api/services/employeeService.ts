import { CreateUser } from "../types/userTypes";
import endpoint from "../endpoint";
import axios from "../axios";
import { AddUserPermissionsRequest, RemoveUserPermissionsRequest } from "../types/permissionTypes";

const employeeService = {
    getAll: async () =>
        await axios.get(endpoint.users),
    get: async (employeeId: number) =>
        await axios.get(`/${endpoint.users}/${employeeId}`),
    create: async (employee: CreateUser) =>
        await axios.post(endpoint.users, employee),
    update: async (employeeId: number, employee: CreateUser) =>
        await axios.put(`/${endpoint.users}/${employeeId}`, employee),
    addPermissions: async (request: AddUserPermissionsRequest) =>
        await axios.post(`${endpoint.users}/${request.userId}/add-permissions`, request),
    removePermissions: async (request: RemoveUserPermissionsRequest) =>
        await axios.post(`${endpoint.users}/${request.userId}/remove-permissions`, request.payload)
};

export default employeeService;