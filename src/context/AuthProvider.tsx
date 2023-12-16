import React, {createContext, useState} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

type AuthProviderProps = {
    children: JSX.Element | JSX.Element[];
}

export type AuthContextBase = {
    auth: AuthContextUser | null;
    setAuth: (isAuth: AuthContextUser) => void;
    clearAuth: () => void;
    persist: boolean;
    setPersist: (persist: boolean) => void;
}

type AuthContextUser = {
    accessToken: string;
}

const defaultValues: AuthContextBase = {
    auth: {
        accessToken: ""
    },
    setAuth: () => { },
    clearAuth: () => {},
    persist: false,
    setPersist: () => {},
}

export const AuthContext = createContext<AuthContextBase | null>(defaultValues);

const AuthProvider = ({children}: AuthProviderProps) => {
    const [auth, setAuth] = useState<AuthContextUser | null>(null);
    const [storage, setStorage] = useLocalStorage("persist", "false")

    const handleSetAuth = (user: AuthContextUser) => setAuth(user);

    const handleChangePersist = (persist: boolean) => setStorage(persist);

    const handleCreatAuth = () => setAuth(null);

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth: handleSetAuth,
                clearAuth: handleCreatAuth,
                persist: storage,
                setPersist: handleChangePersist
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;