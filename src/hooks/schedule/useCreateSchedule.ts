import { useMutation, useQueryClient } from "react-query"
import scheduleService from "../../api/services/scheduleService"
import { ErrorResponse } from "../../api/types/dto"
import { errorToast, successToast } from "../../utils/toastUtil"

const useCreateSchedule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: scheduleService.create,
        onSuccess() {
            successToast("Dodano schemat grafiku")
        },
        onError(error: ErrorResponse) {
            errorToast(error.response.data.message)
        },
        onSettled() {
            queryClient.invalidateQueries(["schedules"])
        },
    })
}

export default useCreateSchedule;