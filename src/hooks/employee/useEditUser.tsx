import {useMutation, useQueryClient} from "react-query";
import {errorToast, successToast} from "../../utils/toastUtil";
import employeeService from "../../api/services/employeeService";
import {ErrorResponse} from "../../api/types/dto";

const useEditUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: employeeService.edit,
        onSuccess: () => {
            successToast("Edytowano pracownika");
        },
        onError: (data: ErrorResponse) => {
            errorToast(data.response.data.message);
        },
        onSettled: () => queryClient.invalidateQueries({queryKey: ["users"]})
    })
}

export default useEditUser;
