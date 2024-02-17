import { useMutation, useQueryClient } from "react-query";
import employeeService from "../../api/services/employeeService";
import {errorToast, successToast} from "../../utils/toastUtil";
import {ErrorResponse} from "../../api/types/dto";
import { UserDto } from "../../api/types/userTypes";

const useRemovePermissions = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: employeeService.removePermissions,
        onSuccess(data, variables) {
            const deletedPermissions = variables.payload.permissions;
            queryClient.setQueryData<Partial<UserDto>>([`user_id_${variables.userId}`], (data) => ({
                ...data,
                permissions: data?.permissions?.filter((permission) => !deletedPermissions.includes(permission.code))
            }));
            successToast("Usunięto uprawnienie");
        },
        onError(error: ErrorResponse) {
            errorToast(error.response.data.message);
        },
        onSettled(data, error, variables) {
            queryClient.invalidateQueries([`user_id_${variables!.userId}`, "permissions"]);
        },
    });
}

export default useRemovePermissions;