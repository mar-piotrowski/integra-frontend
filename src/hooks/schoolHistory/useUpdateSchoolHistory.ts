import {useMutation} from "react-query";
import {errorToast, successToast} from "../../utils/toastUtil";
import {queryClient} from "../../App";
import {schoolHistoryService} from "../../api/services/schoolHistoryService";

const useUpdateSchoolHistory = () => useMutation(schoolHistoryService.update, {
    onSuccess: () => {
        successToast("Zedytowano historię wykształcenia!");
    },
    onError: () => {
        errorToast("Nie udalo sie zedytować historii wykształcenia");
    },
    onSettled: () => queryClient.invalidateQueries({queryKey: ["schoolHistory"]})
});

export default useUpdateSchoolHistory;