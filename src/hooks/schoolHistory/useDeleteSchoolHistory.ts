import {useMutation} from "react-query";
import {errorToast, successToast} from "../../utils/toastUtil";
import {queryClient} from "../../App";
import {schoolHistoryService} from "../../api/services/schoolHistoryService";

const useDeleteSchoolHistory = (jobHistory: number) => useMutation(
    () => schoolHistoryService.delete(jobHistory), {
        onSuccess: () => {
            successToast("Dodano historię wykształcenia");
        },
        onError: () => {
            errorToast("Nie udało się dodać historii wykształcenia!");
        },
        onSettled: () => queryClient.invalidateQueries({queryKey: ["schoolHistories"]})
    });

export default useDeleteSchoolHistory;
