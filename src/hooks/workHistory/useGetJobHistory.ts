import {useQuery} from "react-query";
import {jobHistoryService} from "../../api/services/jobHistoryService";

const useGetJobHistory = (jobHistory: number) => useQuery(
    "jobHistories",
    () => jobHistoryService.get(jobHistory),
    {cacheTime: 0}
);

export default useGetJobHistory;
