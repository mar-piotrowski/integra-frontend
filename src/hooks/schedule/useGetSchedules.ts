import { useQuery } from "react-query";
import scheduleService from "../../api/services/scheduleService";

const useGetSchedules = () => useQuery({
    queryKey: ["schedules"],
    queryFn: async () => ((await scheduleService.getAll()).data.schedules)
});

export default useGetSchedules;