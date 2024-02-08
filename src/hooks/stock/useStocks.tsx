import {useQuery} from "react-query";
import stockService from "../../api/services/stockService";
import {StockDto} from "../../api/types/stockTypes";

const useStocks = () => useQuery<StockDto[]>({
    queryKey: ["stocks"],
    queryFn: async () => (await stockService.getAll()).data.stocks,
    refetchOnWindowFocus: false
});

export default useStocks;