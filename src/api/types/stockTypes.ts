export type StockArticleDto = {
    name: string;
    code: string;
    amount: number;
}

export type StockDto = {
    id: number;
    name: string;
    isMain: boolean;
    description?: string | null;
    totalProductsAmount: number;
    articles: StockArticleDto[]
};

export type StocksResponse = {
    stocks: StockDto[]
};

export type CreateStockRequest = {
   name: string;
   isMain: boolean;
   description?: string | null;
}

export type EditStockRequest = {
    id: number;
    name: string;
    isMain: boolean;
    description?: string | null;
}