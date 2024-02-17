import { useQuery } from "react-query";
import jobPositionService from "../../api/services/jobPositionService";

const useJobPositions = () => useQuery({
    queryKey: ["jobPositions"],
    queryFn: async () => (await jobPositionService.getAll()).data.jobPositions
});

export default useJobPositions;