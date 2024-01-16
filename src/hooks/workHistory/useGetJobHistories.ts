import { useQuery } from "react-query";
import { jobHistoryService } from "../../api/services/jobHistoryService";

const useGetSchoolHistories = (userId: number = -1) => useQuery({
    queryKey: ["jobHistories"],
    queryFn: async () => (await jobHistoryService.getAll(userId)).data.jobHistories,
    cacheTime: 0
})

export default useGetSchoolHistories;
