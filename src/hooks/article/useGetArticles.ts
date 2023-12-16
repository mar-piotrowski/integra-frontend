import {useQuery} from "react-query";
import {articleService} from "../../api/services/articleService";

export const useGetArticles = () => useQuery({
    queryKey: ["articles"],
    queryFn: async () => (await articleService.getAll()).data?.articles
})