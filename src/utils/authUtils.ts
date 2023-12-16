import {jwtDecode} from "jwt-decode";
import {DecodedToken} from "../api/types/authTypes";

export const decodeToken = (token: string): DecodedToken | null => {
    const decode = jwtDecode(token);
    if(decode == undefined)
        return null;
    return  {
        userId: decode?.userId,
        roles: [1,2,3],
        modules: [1,2,3]
    }
}