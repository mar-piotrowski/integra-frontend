import axios from "../axios";
import endpoint from "../endpoint";
import {CreateArticle} from "../types/articleTypes";

export const articleService = {
    getAll: async () => await axios.get(`/${endpoint.articles}`),
    get: async (articleId: number) => await axios.get(`/${endpoint.articles}/${articleId}`),
    create: async (article: CreateArticle) => await axios.post(`/${endpoint.articles}`, article),
}

