import {useMutation} from "react-query";
import {CreateJobHistory} from "../../api/types/documentTypes";
import {errorToast, successToast} from "../../utils/toastUtil";
import {queryClient} from "../../App";
import {jobHistoryService} from "../../api/services/jobHistoryService";

const useCreateJobHistory = () => useMutation(
    (createJobHistory: CreateJobHistory) => jobHistoryService.create(createJobHistory), {
        onSuccess: () => {
            successToast("Dodano historię zatrudnienia");
        },
        onError: () => {
            errorToast("Nie udało się dodać historii zatrudnienia!");
        },
        onSettled: () => queryClient.invalidateQueries({queryKey: ["jobHistories"]})
    });

export default useCreateJobHistory;