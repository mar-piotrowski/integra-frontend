import { useQuery } from "react-query";
import scheduleService from "../../api/services/scheduleService";

const useGetUserSchedules = (userId: number, year: number, month: number, onlyWeek: boolean, fetch: boolean) => {
    return useQuery({
        queryFn: async () => (await scheduleService.getUserSchedule(userId, year, month, onlyWeek)).data.schedule,
        queryKey: [`userSchedule_id_${userId}`],
        cacheTime: 0,
        enabled: fetch,
        retry: false,
        refetchOnWindowFocus: false
    });
};

export default useGetUserSchedules;
