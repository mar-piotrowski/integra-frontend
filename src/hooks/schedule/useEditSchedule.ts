import { useMutation, useQueryClient } from "react-query"
import scheduleService from "../../api/services/scheduleService"
import { errorToast, successToast } from "../../utils/toastUtil";
import { ErrorResponse } from "../../api/types/dto";

const useEditSchedule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: scheduleService.update,
        onSuccess(data, variables, context) {
            successToast("Dodano schemat grafiku")
        },
        onError(error: ErrorResponse, variables, context) {
            errorToast(error.response.data.message)
        },
        onSettled(data, error, variables, context) {
            queryClient.invalidateQueries(["schedules"])
        },
    });
};

export default useEditSchedule;