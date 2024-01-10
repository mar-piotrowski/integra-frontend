import { useMutation, useQueryClient } from "react-query";
import employeeService from "../../api/services/employeeService";
import { UserDto } from "../../api/types/userTypes";

const useRemovePermissions = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: employeeService.removePermissions,
        onSuccess(data, variables) {
            var deletedPermissions = variables.payload.permissions;
            queryClient.setQueryData<Partial<UserDto>>(["employee"], (data) => ({
                ...data,
                permissions: data?.permissions?.filter((permission) => !deletedPermissions.includes(permission.code))
            }));
        },
        onError(error, variables, context) { },
        onSettled(data, error, variables, context) {
            queryClient.invalidateQueries(["employee", "permissions"]);
        },
    });
}

export default useRemovePermissions;