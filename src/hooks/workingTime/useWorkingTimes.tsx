import {useQuery} from "react-query";
import workingTimeService from "../../api/services/workingTimeService";
import {WorkingTimeDto} from "../../api/types/workingTimeTypes";

const useWorkingTimes = (userId?: number) => {
    return useQuery<WorkingTimeDto[]>({
        queryKey:[`${userId == null ? "workingTimes" : `workingTimes_user_id_${userId}`}`],
        queryFn: async () => (await workingTimeService.getAll(userId)).data.workingTimes,
        refetchInterval: 30000
    })
}

export default useWorkingTimes;