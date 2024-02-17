import {jobHistoryService} from "../../api/services/jobHistoryService";
import {errorToast, successToast} from "../../utils/toastUtil";
import {useMutation, useQueryClient} from "react-query";

const useDeleteJobHistory = (userId: number, jobHistoryId: number) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => jobHistoryService.delete(jobHistoryId),
        onSuccess: () => {
            successToast("Usunięto historię wykształcenia");
        },
        onError: () => {
            errorToast("Nie udało się dodać historii wykształcenia!");
        },
        onSettled: async (data, error, variables) => {
            queryClient.invalidateQueries([`jobHistories_user_id_${userId}`]);
            queryClient.invalidateQueries(["jobHistories"]);
        }
    });
}

export default useDeleteJobHistory;
