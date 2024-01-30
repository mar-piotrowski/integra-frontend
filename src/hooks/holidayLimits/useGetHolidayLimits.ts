import { holidayLimitService } from "../../api/services/holidayLimitService";
import { useQuery } from "react-query";

const useGetHolidayLimits = (userId?: number) => useQuery({
    queryKey: [`holidayLimits_user${userId}`],
    queryFn: async () => {
        const response = await holidayLimitService.getAll(userId);
        return response.data.holidayLimits;
    },
});

export default useGetHolidayLimits;