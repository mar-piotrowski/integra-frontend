import { useMutation, useQueryClient } from "react-query"
import employeeService from "../../api/services/employeeService";
import {errorToast, successToast} from "../../utils/toastUtil";
import { ErrorResponse } from "../../api/types/dto";

export type DeleteUserSchedule = {
    userId: number;
    scheduleId: number;
}

const useDeleteUserSchedule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn:  employeeService.delete,
        onSuccess: () => {
            successToast("Usunięto pracownika")
        },
        onError: (response: ErrorResponse) => {
            errorToast(response.response.data.message);
        },
        onSettled: () =>{
            queryClient.invalidateQueries(["users"]);
        }
    });
}

export default useDeleteUserSchedule;