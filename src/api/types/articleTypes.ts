type Id = {
    id: number;
}

export type Article = {
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
    description?: string;
}

export type ChangeArticleAmount = {
    articleId: number;
    amount: number;
}

export type CreateArticle = Article;

export type EditArticle = Article & Id;

export type ArticleDto = Article & Id & { amount: number };

export type ArticlesResponse = {
   articles: ArticleDto[]
}