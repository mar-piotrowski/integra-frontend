import axios from "../axios";
import endpoint from "../endpoint";
import {StockDto, StocksResponse} from "../types/stockTypes";

const stockService = {
    getAll: async () => axios.get<StocksResponse>(endpoint.stocks),
    get: async (stockId: number) => axios.get<StockDto>(`${endpoint.stocks}/${stockId}`)
};

export default stockService;