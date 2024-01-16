import { jobHistoryService } from "../../api/services/jobHistoryService";
import { errorToast, successToast } from "../../utils/toastUtil";
import { useMutation, useQueryClient } from "react-query";
import { JobHistoryDto } from "../../api/types/documentTypes";

const useDeleteJobHistory = (jobHistoryId: number) => {
    const queryClient = useQueryClient();
    return useMutation(
        () => jobHistoryService.delete(jobHistoryId), {
        onSuccess: () => {
            successToast("Usunięto historię wykształcenia");
            var schoolHistories: (JobHistoryDto[] | undefined) = queryClient.getQueryData(["jobHistories"]);
            if (schoolHistories?.length == 1)
                queryClient.setQueryData(["schoolHistories"], []);
            queryClient.setQueryData<Partial<JobHistoryDto>[] | undefined>(["jobHistories"], (data) => {
                if (data != undefined)
                    return data.filter(jobHistory => jobHistory.id != jobHistoryId)
            })
        },
        onError: () => {
            errorToast("Nie udało się dodać historii wykształcenia!");
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["jobHistories"] })
    });
}

export default useDeleteJobHistory;
