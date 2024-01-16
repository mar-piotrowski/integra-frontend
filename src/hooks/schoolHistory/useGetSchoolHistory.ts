import { useQuery } from "react-query";
import { schoolHistoryService } from "../../api/services/schoolHistoryService";

const useGetSchoolHistory = (schoolHistoryId: number) => useQuery({
    queryKey: ["schoolHistories"],
    queryFn: () => schoolHistoryService.get(schoolHistoryId),
    cacheTime: 0
});

export default useGetSchoolHistory;