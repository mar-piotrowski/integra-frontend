import { errorToast, successToast } from "../../utils/toastUtil";
import { schoolHistoryService } from "../../api/services/schoolHistoryService";
import { useMutation, useQueryClient } from "react-query";
import { CreateSchoolHistory, SchoolHistoryDto } from "../../api/types/documentTypes";

const useCreateSchoolHistory = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (createSchoolHistory: CreateSchoolHistory) => schoolHistoryService.create(createSchoolHistory), {
        onSuccess: (data, variables) => {
            successToast("Dodano historię wykształcenia");
            var newSchool = { ...variables };
            queryClient.setQueryData<Partial<SchoolHistoryDto>[] | undefined>(["schoolHistories"], (data) => {
                if (data != undefined)
                    return [...data, newSchool];
            })
        },
        onError: () => {
            errorToast("Nie udało się dodać historii wykształcenia!");
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["schoolHistories"] })
    });
}

export default useCreateSchoolHistory;