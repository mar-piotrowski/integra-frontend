import axios from "../axios";
import endpoint from "../endpoint";
import {EditWorkingTimeDto, WorkingTimesResponse} from "../types/workingTimeTypes";

const workingTimeService = {
    getAll: async (userId?: number) =>
        axios.get<WorkingTimesResponse>(`${endpoint.workingTimes}${queryParams(userId)}`),
    edit: async (workingTime: EditWorkingTimeDto) =>
        axios.put(`${endpoint.workingTimes}/${workingTime.id}`, workingTime),
    delete: async (workingTimeId: number) =>
        axios.delete(`${endpoint.workingTimes}/${workingTimeId}`),
}

const queryParams = (userId?: number) => {
    let params = ""
    if (userId != null)
        params += `?userId=${userId}`;
    return params
}

export default workingTimeService;