import {useMutation} from "react-query";
import authenticationService from "../../api/services/authenticationService";

const useLogout = ()  => useMutation({
   mutationFn: authenticationService.logout
});

export default useLogout;