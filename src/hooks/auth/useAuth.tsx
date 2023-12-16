import {useContext} from "react";
import {AuthContext, AuthContextBase} from "../../context/AuthProvider";

const useAuth = () => {
    return useContext(AuthContext) as AuthContextBase;
}

export default useAuth;