import {holidayLimitService} from "../../api/services/holidayLimitService";
import {useQuery} from "react-query";

const useGetHolidayLimits = (userId?: number) => useQuery({
    queryKey: [userId != null ? `holidayLimits_user${userId}` : "holidayLimits"],
    queryFn: async () => {
        const response = await holidayLimitService.getAll(userId);
        return response.data.holidayLimits;
    },
});

export default useGetHolidayLimits;