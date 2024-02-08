import {useMutation} from "react-query";
import {errorToast, successToast} from "../../utils/toastUtil";
import {queryClient} from "../../App";
import employeeService from "../../api/services/employeeService";
import { ErrorResponse } from "../../api/types/dto";

const useCreateEmployee = () => useMutation(employeeService.create, {
    onSuccess: () => {
        successToast("Dodano pracownika");
    },
    onError: (data: ErrorResponse) => {
        errorToast(data.response.data.message);
    },
    onSettled: () => queryClient.invalidateQueries({queryKey: ["users"]})
});

export default useCreateEmployee;