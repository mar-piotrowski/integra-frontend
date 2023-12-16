import {useMutation} from "react-query";
import {errorToast, successToast} from "../../utils/toastUtil";
import {queryClient} from "../../App";
import employeeService from "../../api/services/employeeService";
import {AxiosResponse} from "axios";

const useCreateEmployee = () => useMutation(employeeService.create, {
    onSuccess: () => {
        successToast("Dodano pracownika");
    },
    onError: (response: AxiosResponse) => {
        errorToast(response.data.message);
    },
    onSettled: () => queryClient.invalidateQueries({queryKey: ["employeess"]})
});

export default useCreateEmployee;