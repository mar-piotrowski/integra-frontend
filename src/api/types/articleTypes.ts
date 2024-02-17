type Id = {
    id: number;
}

export type Article = {
;
}


export type EditArticleRequest = {
    id: number;
    name: string;
    code?: string;
    gtin?: string;
    measureUnit: string;
    sellPriceWithTax: number;
    sellPriceWithoutTax: number;
    buyPriceWithTax: number;
    buyPriceWithoutTax: number;
    pkwiu: string;
    tax: number
    description?: string;
}

export type CreateArticleRequest = {
    name: string;
    code?: string;
    gtin?: string;
    measureUnit: string;
    sellPriceWithTax: number;
    sellPriceWithoutTax: number;
    buyPriceWithTax: number;
    buyPriceWithoutTax: number;
    pkwiu: string;
    tax: number
    description?: string;
}

export type ChangeArticleAmount = {
    articleId: number;
    amount: number;
}

export type ArticleDto = {
    id: number;
    name: string;
    code?: string;
    gtin?: string;
    measureUnit: string;
    stockAmount: number;
    sellPriceWithTax: number;
    sellPriceWithoutTax: number;
    buyPriceWithTax: number;
    buyPriceWithoutTax: number;
    pkwiu: string;
    tax: number
    description?: string
}

export type ArticlesResponse = {
   articles: ArticleDto[]
}