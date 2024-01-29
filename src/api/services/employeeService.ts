import { CreateUser } from "../types/userTypes";
import endpoint from "../endpoint";
import axios from "../axios";
import { AddUserPermissionsRequest, RemoveUserPermissionsRequest } from "../types/permissionTypes";
import { AddUserSchedule as AddUserScheduleRequest } from "../types/scheduleTypes";
import { DeleteUserSchedule } from "../../hooks/employee/useDeleteSchedule";

const employeeService = {
    getAll: async () =>
        await axios.get(endpoint.users),
    get: async (employeeId: number) =>
        await axios.get(`/${endpoint.users}/${employeeId}`),
    create: async (employee: CreateUser) =>
        await axios.post(endpoint.users, employee),
    update: async (employeeId: number, employee: CreateUser) =>
        await axios.put(`/ ${endpoint.users}/${employeeId}`, employee),
    addPermissions: async (request: AddUserPermissionsRequest) =>
        await axios.post(`${endpoint.users}/${request.userId}/add-permissions`, request),
    removePermissions: async (request: RemoveUserPermissionsRequest) =>
        await axios.post(`${endpoint.users}/${request.userId}/remove-permissions`, request.payload),
    addSchedule: async (request: AddUserScheduleRequest) =>
        await axios.post(`${endpoint.users}/${request.userId}/${endpoint.schedules}/add-schedule`, request),
    removeSchedule: async (payload: DeleteUserSchedule) =>
        await axios.delete(`${endpoint.users}/${payload.userId}/${endpoint.schedules}/${payload.scheduleId}/remove-schedule`,)
};

export default employeeService;