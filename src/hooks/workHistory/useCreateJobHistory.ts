import { useMutation, useQueryClient } from "react-query";
import { CreateJobHistory, JobHistoryDto } from "../../api/types/documentTypes";
import { errorToast, successToast } from "../../utils/toastUtil";
import { jobHistoryService } from "../../api/services/jobHistoryService";

const useCreateJobHistory = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (createJobHistory: CreateJobHistory) => jobHistoryService.create(createJobHistory), {
        onSuccess: (data, variables) => {
            successToast("Dodano historię zatrudnienia");
            queryClient.setQueryData<Partial<JobHistoryDto>[] | undefined>(["jobHistories"], (data) => {
                if (data != undefined)
                    return [...data, {
                        companyName: variables.companyName,
                        position: variables.position,
                        startDate: variables.startDate,
                        endDate: variables.endDate
                    }];
            })
        },
        onError: () => {
            errorToast("Nie udało się usunąć historii zatrudnienia!");
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["jobHistories"] })
    });
}

export default useCreateJobHistory;