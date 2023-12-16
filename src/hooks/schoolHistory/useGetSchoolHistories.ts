import {useQuery} from "react-query";
import {schoolHistoryService} from "../../api/services/schoolHistoryService";

const useGetSchoolHistories = (userId: number = -1) => useQuery(
    "schoolHistory",
    () => schoolHistoryService.getAll(userId),
    {cacheTime: 0}
);
export default useGetSchoolHistories;