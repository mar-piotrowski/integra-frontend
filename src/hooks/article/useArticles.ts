import {useQuery} from "react-query";
import {articleService} from "../../api/services/articleService";
import {ArticleDto} from "../../api/types/articleTypes";
import {ErrorResponse} from "../../api/types/dto";

export const useArticles = () => useQuery<ArticleDto[], ErrorResponse>({
    queryKey: ["articles"],
    queryFn: async () => (await articleService.getAll()).data.articles
})