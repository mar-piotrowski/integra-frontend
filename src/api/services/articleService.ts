import axios from "../axios";
import endpoint from "../endpoint";
import {ArticleDto, ArticlesResponse, ChangeArticleAmount, CreateArticle, EditArticle} from "../types/articleTypes";

export const articleService = {
    getAll: async () => await axios.get<ArticlesResponse>(`/${endpoint.articles}`),
    get: async (articleId: number) => await axios.get<ArticleDto>(`${endpoint.articles}/${articleId}`),
    create: async (article: CreateArticle) => await axios.post(`${endpoint.articles}`, article),
    update: async (article: EditArticle) => await axios.put(`${endpoint.articles}/${article.id}`, article),
    delete: async (articleId: number) => await axios.delete(`${endpoint.articles}/${articleId}`),
    changeAmount: async (payload: ChangeArticleAmount) =>
        await axios.post(`${endpoint.articles}/${payload.articleId}/change-amount`, payload)
};