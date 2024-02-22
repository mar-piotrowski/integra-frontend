import {CreateUserRequest, UserDto, UsersResponse} from "../types/userTypes";
import endpoint from "../endpoint";
import axios from "../axios";
import { AddUserPermissionsRequest, RemoveUserPermissionsRequest } from "../types/permissionTypes";
import { AddUserSchedule as AddUserScheduleRequest } from "../types/scheduleTypes";
import { DeleteUserSchedule } from "../../hooks/employee/useDeleteSchedule";

const employeeService = {
    getAll: async () =>
        await axios.get<UsersResponse>(endpoint.users),
    get: async (employeeId: number) =>
        await axios.get<UserDto>(`/${endpoint.users}/${employeeId}`),
    create: async (employee: CreateUserRequest) =>
        await axios.post(endpoint.users, employee),
    edit: async (employee: CreateUserRequest) =>
        await axios.put(`/${endpoint.users}/${employee.id}`, employee),
    delete: async (employeeId: number) =>
        await axios.delete(`/${endpoint.users}/${employeeId}`),
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