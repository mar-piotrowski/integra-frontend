import {jobHistoryService} from "../../api/services/jobHistoryService";
import {errorToast, successToast} from "../../utils/toastUtil";
import {queryClient} from "../../App";
import { useMutation } from "react-query";

const useDeleteJobHistory = (jobHistory: number) => useMutation(
    () => jobHistoryService.delete(jobHistory), {
        onSuccess: () => {
            successToast("Dodano historię wykształcenia");
        },
        onError: () => {
            errorToast("Nie udało się dodać historii wykształcenia!");
        },
        onSettled: () => queryClient.invalidateQueries({queryKey: ["jobHistories"]})
    });

export default useDeleteJobHistory;
