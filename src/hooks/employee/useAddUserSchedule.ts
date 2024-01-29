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
        onError: (response: ErrorResponse) => {
            errorToast(response.response.data.message);
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["userSchedule"] })
    });
};

export default useAddUserSchedule;