import {errorToast, successToast} from "../../utils/toastUtil";
import {queryClient} from "../../App";
import {schoolHistoryService} from "../../api/services/schoolHistoryService";
import {useMutation} from "react-query";
import {CreateSchoolHistory} from "../../api/types/documentTypes";

const useCreateSchoolHistory = () => useMutation(
    (createSchoolHistory: CreateSchoolHistory) => schoolHistoryService.create(createSchoolHistory), {
        onSuccess: () => {
            successToast("Dodano historię wykształcenia");
        },
        onError: () => {
            errorToast("Nie udało się dodać historii wykształcenia!");
        },
        onSettled: () => queryClient.invalidateQueries({queryKey: ["schoolHistory"]})
    });

export default useCreateSchoolHistory;