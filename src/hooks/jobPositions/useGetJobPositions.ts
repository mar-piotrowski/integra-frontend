import { useQuery } from "react-query";
import jobPositionService from "../../api/services/jobPositionService";

const useGetJobPositions = () => useQuery({
    queryKey: ["jobPositions"],
    queryFn: async () => (await jobPositionService.getAll()).data.jobPositions,
    cacheTime: 0
});

export default useGetJobPositions;