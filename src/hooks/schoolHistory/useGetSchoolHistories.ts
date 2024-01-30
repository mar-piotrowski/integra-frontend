import { useQuery } from "react-query";
import { schoolHistoryService } from "../../api/services/schoolHistoryService";

const useGetSchoolHistories = (userId: number = -1) => useQuery({
    queryKey: [`schoolHistories_user_${userId}`],
    queryFn: async () => (await schoolHistoryService.getAll(userId)).data,
    cacheTime: 0
});

export default useGetSchoolHistories;