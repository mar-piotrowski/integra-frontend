import { useMutation, useQueryClient } from "react-query"
import employeeService from "../../api/services/employeeService";
import { errorToast, successToast } from "../../utils/toastUtil";
import { ErrorResponse } from "../../api/types/dto";

const useAddUserSchedule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: employeeService.addSchedule,
        onSuccess: () => {
            successToast("Dodano pracownika");
        },
        onError: (data: ErrorResponse) => {
            errorToast(data.response.data.message);
        },
        onSettled: (data, variables, context) => {
            queryClient.invalidateQueries([`schedules_user_id_${context.userId}`])
        }
    });
};

export default useAddUserSchedule;