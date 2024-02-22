import { useMutation, useQueryClient } from "react-query";
import { errorToast, successToast } from "../../utils/toastUtil";
import { schoolHistoryService } from "../../api/services/schoolHistoryService";
import {ErrorResponse} from "../../api/types/dto";

const useDeleteSchoolHistory = (userId: number, jobHistoryId: number) => {
    const queryClient = useQueryClient();
    return useMutation(
        () => schoolHistoryService.delete(jobHistoryId), {
        onSuccess: () => {
            successToast("Usunięto historię wykształcenia");
        },
        onError: (error: ErrorResponse) => {
            errorToast(error.response.data.message);
        },
        onSettled: () => queryClient.invalidateQueries([`schoolHistories_user_id_${userId}`])
    });
}


export default useDeleteSchoolHistory;
