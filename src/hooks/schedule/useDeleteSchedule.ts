import { useMutation, useQueryClient } from "react-query"
import scheduleService from "../../api/services/scheduleService";
import { errorToast, successToast } from "../../utils/toastUtil";
import { ErrorResponse } from "../../api/types/dto";

const useDeleteSchedule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: scheduleService.delete,
        onSuccess: () => {
            successToast("Grafik został usunięty")
        },
        onError: (error: ErrorResponse) => {
            errorToast(error.response.data.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["schedules"])
        }
    });
};

export default useDeleteSchedule;