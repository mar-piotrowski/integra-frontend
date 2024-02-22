import {useQuery} from "react-query";
import {UserWorkingTimeStatResponse, UserWorkingTimeStatsRequest} from "../../api/types/workingTimeTypes";
import workingTimeService from "../../api/services/workingTimeService";

const useWorkingTimeUserStats = (request: UserWorkingTimeStatsRequest) => {
    return useQuery<UserWorkingTimeStatResponse>({
        queryKey: [`workingTimes_stats_user_id_${request.userId}`],
        queryFn: async () => (await workingTimeService.userStats(request)).data,
    });
};

export default useWorkingTimeUserStats;