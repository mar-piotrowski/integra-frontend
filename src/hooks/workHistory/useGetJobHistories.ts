import {useQuery} from "react-query";
import {jobHistoryService} from "../../api/services/jobHistoryService";

const useGetSchoolHistories = (userId: number = -1) => useQuery(
    "jobHistories",
    () => jobHistoryService.getAll(userId),
    {cacheTime: 0}
);

export default useGetSchoolHistories;
