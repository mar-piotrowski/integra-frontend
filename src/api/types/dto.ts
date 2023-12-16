import {AxiosResponse} from "axios";

export interface ErrorResponse extends AxiosResponse {
    response: {
        data: {
            code: string;
            message: string;
        }
    }
}