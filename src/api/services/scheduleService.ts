import axios from "../axios";
import endpoint from "../endpoint";
import { CreateSchedule, EditSchedule } from "../types/scheduleTypes";

const scheduleService = {
    getAll: async () => await axios.get(`${endpoint.schedules}`),
    get: async (scheduleId: number) => await axios.get(`${endpoint.schedules}/${scheduleId}`),
    getUserSchedule: async (employeeId: number, year: number, month: number, onlyWeek: boolean) =>
        await axios.get(`${endpoint.schedules}/${endpoint.users}/${employeeId}/${year}/${month}?onlyWeek=${onlyWeek}`),
    getUsersSchedule: async (year: number, month: number, onlyWeek: boolean) =>
        await axios.get(`${endpoint.schedules}/${endpoint.users}/${year}/${month}?onlyWeek=${onlyWeek}`),
    create: async (schedule: CreateSchedule) => await axios.post(`${endpoint.schedules}`, schedule),
    update: async (schedule: EditSchedule) => await axios.put(`${endpoint.schedules}/${schedule.id}`, schedule),
    delete: async (scheduleId: number) => await axios.delete(`${endpoint.schedules}/${scheduleId}`)
};

export default scheduleService;