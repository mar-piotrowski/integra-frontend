export type StockDto = {
    id: number;
    name: string;
    isMain: boolean;
};

export type StocksResponse = {
    stocks: StockDto[]
};
