import axios from "../axios";
import endpoint from "../endpoint";
import {CreateHolidayLimit} from "../types/documentTypes";

export const holidayLimitService = {
    getAll: async (userId?: number) =>
        await axios.get(`/${endpoint.holidayLimits}${userId != null ? `?userId=${userId}` : ""}`),
    get: async (holidayLimitId: number) =>
        await axios.get(`/${endpoint.holidayLimits}/${holidayLimitId}`),
    create: async (createSchoolHistory: CreateHolidayLimit) =>
        await axios.post(`/${endpoint.holidayLimits}`, createSchoolHistory),
}

