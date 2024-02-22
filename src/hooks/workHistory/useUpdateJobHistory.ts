import {useMutation} from "react-query";
import {errorToast, successToast} from "../../utils/toastUtil";
import {queryClient} from "../../App";
import {jobHistoryService} from "../../api/services/jobHistoryService";

const useUpdateJobHistory = (userId: number) => useMutation(jobHistoryService.update, {
    onSuccess: () => {
        successToast("Zedytowano historię zatrudnienia!");
    },
    onError: () => {
        errorToast("Nie udalo sie zedytować historii zatrudnienia");
    },
    onSettled: () => {
        queryClient.invalidateQueries(["jobHistories"])
        queryClient.invalidateQueries([`jobHistories_user_id_${userId}`])
    }
});

export default useUpdateJobHistory;
