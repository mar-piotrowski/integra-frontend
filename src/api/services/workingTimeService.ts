import axios from "../axios";
import endpoint from "../endpoint";
import {
    EditWorkingTimeDto,
    UserWorkingTimeStatResponse,
    UserWorkingTimeStatsRequest,
    WorkingTimesResponse
} from "../types/workingTimeTypes";

const workingTimeService = {
    getAll: async (userId?: number) =>
        await axios.get<WorkingTimesResponse>(`${endpoint.workingTimes}${queryParams(userId)}`),
    userStats: async (stats: UserWorkingTimeStatsRequest) =>
        await axios.get<UserWorkingTimeStatResponse>(
            `${endpoint.workingTimes}/${endpoint.users}/${stats.userId}/stats/${stats.year}/${stats.month}`),
    edit: async (workingTime: EditWorkingTimeDto) =>
        await axios.put(`${endpoint.workingTimes}/${workingTime.id}`, workingTime),
    delete: async (workingTimeId: number) =>
        await axios.delete(`${endpoint.workingTimes}/${workingTimeId}`),
}

const queryParams = (userId?: number) => {
    let params = ""
    if (userId != null)
        params += `?userId=${userId}`;
    return params
}

export default workingTimeService;