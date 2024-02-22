import { useMutation } from "react-query";
import { Login } from "../../api/types/authTypes";
import authenticationService from "../../api/services/authenticationService";
import { errorToast, successToast } from "../../utils/toastUtil";
import { ErrorResponse } from "../../api/types/dto";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "../../utils/authUtils";

const useLogin = () => {
    const { setAuth } = useAuth();
    return useMutation({
        mutationFn: async (login: Login) => (await authenticationService.login(login)).data.accessToken,
        onSuccess: (data) => {
            setAuth({ accessToken: data, userId: decodeToken(data)?.userId!, permissions: decodeToken(data)?.permissions! });
            console.log(decodeToken(data));
            successToast("Zalogowano!");
        },
        onError: (data: ErrorResponse) => {
            errorToast(data.response.data.message);
        },
    });
}

export default useLogin;