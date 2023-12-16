import axios from "../axios";
import endpoint from "../endpoint";
import {CreateJobHistory, UpdateJobHistory} from "../types/documentTypes";

export const jobHistoryService = {
    getAll: async (userId?: number) => await axios.get(`/${endpoint.jobHistory}${createGetAllParams(userId)}`),
    get: async (jobHistoryId: number) => await axios.get(`/${endpoint.jobHistory}/${jobHistoryId}`),
    create: async (createJobHistory: CreateJobHistory) =>
        await axios.post(`/${endpoint.jobHistory}`, createJobHistory),
    update: async (updateJobHistory: UpdateJobHistory) =>
        await axios.put(`/${endpoint.jobHistory}/${updateJobHistory.jobHistoryId}`, updateJobHistory.jobHistory),
    delete: async (jobHistoryId: number) =>
        await axios.delete(`/${endpoint.jobHistory}/${jobHistoryId}`),
}

const createGetAllParams = (userId?: number) => {
    let params = "";
    if (userId != null)
        params += `?userId=${userId}`;
    return params;
}