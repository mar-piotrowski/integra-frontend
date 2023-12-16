type Id = {
    id: number;
}

type Article = {
    name: string;
    code: string;
    gtin: string;
    measureUnit: string;
    sellPriceWithTax: number;
    sellPriceWithoutTax: number;
    buyPriceWithTax: number;
    buyPriceWithoutTax: number;
    pkwiu: string;
    taxId: number
    description?: string;
}

export type CreateArticle = Article;

export type ArticleDto = Article & Id;
