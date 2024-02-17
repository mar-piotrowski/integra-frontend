import { useQuery } from "react-query";
import { jobHistoryService } from "../../api/services/jobHistoryService";

const useGetSchoolHistories = (userId?: number ) => useQuery({
    queryKey: [userId != null ? `jobHistories_user_id_${userId}`: "jobHistories"],
    queryFn: async () => (await jobHistoryService.getAll(userId)).data.jobHistories,
    refetchOnWindowFocus: false
})

export default useGetSchoolHistories;
