import { useMutation } from "react-query"
import { queryClient } from "../../App";
import { articleService } from "../../api/services/articleService";
import { ErrorResponse } from "../../api/types/dto";
import { successToast, errorToast } from "../../utils/toastUtil";

const useChangeArticleAmount = () => {
    return useMutation({
        mutationFn: articleService.changeAmount,
        onSuccess: () => {
            successToast("Zaktualizowano artykuł");
        },
        onError: (data: ErrorResponse) => {
            errorToast(data.response.data.message);
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["articles"] })
    });
}

export default useChangeArticleAmount;