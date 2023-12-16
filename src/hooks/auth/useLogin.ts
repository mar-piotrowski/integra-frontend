import {useMutation} from "react-query";
import {Login} from "../../api/types/authTypes";
import authenticationService from "../../api/services/authenticationService";
import {errorToast, successToast} from "../../utils/toastUtil";
import {ErrorResponse} from "../../api/types/dto";
import useAuth from "./useAuth";
import {useNavigate} from "react-router-dom";

const useLogin = () => {
    const {setAuth} = useAuth();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (login: Login) => (await authenticationService.login(login)).data.accessToken,
        onSuccess: (data) => {
            setAuth({accessToken: data});
            successToast("Zalogowano!");
            navigate("/employee-panel");
        },
        onError: (data: ErrorResponse) => {
            errorToast(data.response.data.message);
        },
    });
}

export default useLogin;