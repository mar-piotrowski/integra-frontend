import { useMutation, useQueryClient } from "react-query"
import employeeService from "../../api/services/employeeService";
import { errorToast } from "../../utils/toastUtil";
import { ErrorResponse } from "../../api/types/dto";

export type DeleteUserSchedule = {
    userId: number;
    scheduleId: number;
}

const useDeleteUserSchedule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (payload: DeleteUserSchedule) => await employeeService.removeSchedule(payload),
        onSuccess: () => {

        },
        onError: (response: ErrorResponse) => {
            errorToast(response.response.data.message);
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["employeess"] })
    });
}

export default useDeleteUserSchedule;