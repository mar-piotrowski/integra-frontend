import { useQuery } from "react-query";
import scheduleService from "../../api/services/scheduleService";

const useGetUsersSchedules = (year: number, month: number, onlyWeek: boolean) => {
    return useQuery({
        queryFn: async () => (await scheduleService.getUsersSchedule(year, month, onlyWeek)).data.users,
        queryKey: ["usersSchedule"],
        cacheTime: 0,
        retry: false,
        refetchOnWindowFocus: false
    });
};

export default useGetUsersSchedules;

