import axios from "../axios";
import {CardsResponse, CreateCardRequest} from "../types/cardTypes";
import endpoint from "../endpoint";

export const cardService = {
    getAll: async (userId?: number) => await axios.get<CardsResponse>(`${endpoint.cards}${queryParams(userId)}`),
    create: async (card: CreateCardRequest) => await axios.post(`${endpoint.cards}`, card),
    active: async (cardNumber: string) => await axios.post(`${endpoint.cards}/${cardNumber}/active`),
    deActive: async (cardNumber: string) => await axios.post(`${endpoint.cards}/${cardNumber}/de-active`),
    delete: async (cardNumber: string) => await axios.delete(`${endpoint.cards}/${cardNumber}`),
}

const queryParams = (userId?: number) => {
    let params = ""
    if (userId != null)
        params += `?userId=${userId}`;
    return params
}