import axios from "../axios";
import endpoint from "../endpoint";
import {CreateStockRequest, EditStockRequest, StockDto, StocksResponse} from "../types/stockTypes";

const stockService = {
    getAll: async () => await axios.get<StocksResponse>(endpoint.stocks),
    get: async (stockId: number) => await axios.get<StockDto>(`${endpoint.stocks}/${stockId}`),
    create: async (stock: CreateStockRequest) => await axios.post(`${endpoint.stocks}`, stock),
    edit: async (stock: EditStockRequest) => await axios.put(`${endpoint.stocks}/${stock.id}`, stock),
    delete: async (stockId: number) => await axios.delete(`${endpoint.stocks}/${stockId}`),
};

export default stockService;