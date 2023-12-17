import useAuth from "./useAuth";
import { useQuery } from "react-query";
import authenticationService from "../../api/services/authenticationService";
import { useState } from "react";
import { queryClient } from "../../App";
import { decodeToken } from "../../utils/authUtils";

const useRefreshToken = (enable: boolean) => {
    const { auth, setAuth } = useAuth();
    const [token, setToken] = useState<string | null>(null);
    const query = useQuery({
        queryKey: ["juan"],
        queryFn: async () => (await authenticationService.refreshToken(auth?.accessToken ?? "")).data,
        onSuccess: (data) => {
            var token = decodeToken(data.accessToken);
            if (token?.userId == undefined)
                return;
            setAuth({ accessToken: data.accessToken, userId: token.userId });
            setToken(data.accessToken);
            queryClient.removeQueries(["juan"]);
        },
        enabled: enable,
        cacheTime: 0,
    });
    return { token, query };

}
export default useRefreshToken;