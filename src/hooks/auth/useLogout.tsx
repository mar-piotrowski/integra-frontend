import { useMutation } from "react-query";
import authenticationService from "../../api/services/authenticationService";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const useLogout = () => {
   const { clearAuth, setPersist } = useAuth();
   const navigate = useNavigate();

   return useMutation({
      mutationFn: authenticationService.logout,
      onSuccess: () => {
         clearAuth();
         setPersist(false);
         navigate("/");
      }
   });
}

export default useLogout;