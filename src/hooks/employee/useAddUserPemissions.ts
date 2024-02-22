import { useMutation, useQueryClient } from "react-query";
import { errorToast, successToast } from "../../utils/toastUtil";
import employeeService from "../../api/services/employeeService";
import { AxiosResponse } from "axios";

const useAddUserPermissions = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: employeeService.addPermissions,
        onSuccess: () => {
            successToast("Dodano uprawnienia");
        },
        onError: (response: AxiosResponse) => {
            errorToast(response.data.message);
        },
        onSettled: (data, variables, context) =>
            queryClient.invalidateQueries([`user_id_${context.userId}`])
    });
}

export default useAddUserPermissions;