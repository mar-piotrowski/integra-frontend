import { JwtPayload, jwtDecode } from "jwt-decode";
import { DecodedToken } from "../api/types/authTypes";

interface UserPayload extends JwtPayload {
    userId: number;
    permissions: number[];
}

export const decodeToken = (token: string): DecodedToken | null => {
    const decode = jwtDecode<UserPayload>(token);
    if (decode == undefined)
        return null;
    return {
        userId: decode!.userId,
        permissions: decode!.permissions
    }
}