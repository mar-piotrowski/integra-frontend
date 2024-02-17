import {useMutation, useQueryClient} from "react-query";
import {CreateJobHistory} from "../../api/types/documentTypes";
import {errorToast, successToast} from "../../utils/toastUtil";
import {jobHistoryService} from "../../api/services/jobHistoryService";

const useCreateJobHistory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (createJobHistory: CreateJobHistory) => jobHistoryService.create(createJobHistory),
        onSuccess: () => {
            successToast("Dodano historię zatrudnienia");
        },
        onError: () => {
            errorToast("Nie udało się usunąć historii zatrudnienia!");
        },
        onSettled: async (data, error, variables) => {
            queryClient.invalidateQueries([`jobHistories_user_id_${variables.userId}`]);
            queryClient.invalidateQueries(["jobHistories"]);
        }
    });
}

export default useCreateJobHistory;