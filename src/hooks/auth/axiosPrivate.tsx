import axios from "../../api/axios";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import {useEffect, useState} from "react";

const AxiosPrivate = () => {
    const [fetch, setFetch] = useState(false);
    const {token} = useRefreshToken(fetch);
    const { auth } = useAuth();

    useEffect(() => {
        setFetch(false);
        const requestIntercept = axios.interceptors.request.use(
            config => {
                if (!config.headers['Authorization'])
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axios.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    setFetch(true);
                    prevRequest.headers['Authorization'] = `Bearer ${token}`;
                    return axios(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestIntercept);
            axios.interceptors.response.eject(responseIntercept);
        }
    }, [auth, token])

    return axios;
}

export default AxiosPrivate;