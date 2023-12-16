import {useMutation} from "react-query";
import authenticationService from "../../api/services/authenticationService";
import {errorToast, successToast} from "../../utils/toastUtil";
import {Register} from "../../api/types/authTypes";

const useRegister = () => useMutation((register: Register) => authenticationService.register(register), {
    onSuccess: (data) => {
        successToast("Utworzono kont!");
    },
    onError: () => {
        errorToast("Podano błędne dane");
    },
    onSettled: () => {
    }
});

export default useRegister;