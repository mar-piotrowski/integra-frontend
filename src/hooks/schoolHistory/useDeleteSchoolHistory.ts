import { useMutation, useQueryClient } from "react-query";
import { errorToast, successToast } from "../../utils/toastUtil";
import { schoolHistoryService } from "../../api/services/schoolHistoryService";
import { SchoolHistoryDto } from "../../api/types/documentTypes";

const useDeleteSchoolHistory = (jobHistoryId: number) => {
    const queryClient = useQueryClient();
    return useMutation(
        () => schoolHistoryService.delete(jobHistoryId), {
        onSuccess: () => {
            successToast("Usunięto historię wykształcenia");
            var schoolHistories: (SchoolHistoryDto[] | undefined) = queryClient.getQueryData(["schoolHistories"]);
            if (schoolHistories?.length == 1)
                queryClient.setQueryData(["schoolHistories"], []);
            queryClient.setQueryData<Partial<SchoolHistoryDto>[] | undefined>(["schoolHistories"], (data) => {
                if (data != undefined)
                    return data.filter(jobHistory => jobHistory.id != jobHistoryId)
            })
        },
        onError: () => {
            errorToast("Nie udało się dodać historii wykształcenia!");
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["schoolHistories"] })
    });
}


export default useDeleteSchoolHistory;
