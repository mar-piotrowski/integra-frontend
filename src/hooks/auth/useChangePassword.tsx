import {useMutation} from "react-query";
import authenticationService from "../../api/services/authenticationService";
import {errorToast, successToast} from "../../utils/toastUtil";
import {ErrorResponse} from "../../api/types/dto";

const useChangePassword = () => {
    return useMutation({
        mutationFn: authenticationService.changePassword,
        onSuccess() {
            successToast("Zmieniono hasło")
        },
        onError(error: ErrorResponse) {
            errorToast(error.response.data.message)
        },
    })
}

export default useChangePassword;