import axios from "../axios";
import endpoint from "../endpoint";
import {CreateSchoolHistory, UpdateSchoolHistory} from "../types/documentTypes";

export const schoolHistoryService = {
    getAll: async (userId?: number) => await axios.get(
        `/${endpoint.schoolHistory}/${userId != -1 ? `?userId=${userId}` : ""}`
    ),
    get: async (schoolHistoryId: number) => await axios.get(`/${endpoint.schoolHistory}/${schoolHistoryId}`),
    create: async (createSchoolHistory: CreateSchoolHistory) => await axios.post(
        `/${endpoint.schoolHistory}`,
        createSchoolHistory
    ),
    update: async (updateSchoolHistory: UpdateSchoolHistory) => await axios.put(
        `/${endpoint.schoolHistory}/${updateSchoolHistory.schoolHistoryId}`,
        updateSchoolHistory.schoolHistory
    ),
    delete: async (schoolHistoryId: number) => await axios.delete(`/${endpoint.schoolHistory}/${schoolHistoryId}`),
}