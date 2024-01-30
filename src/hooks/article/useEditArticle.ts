import { useMutation } from "react-query";
import { articleService } from "../../api/services/articleService";
import { errorToast, successToast } from "../../utils/toastUtil";
import { queryClient } from "../../App";
import { ErrorResponse } from "../../api/types/dto";

const useEditArticle = () => useMutation({
    mutationFn: articleService.update,
    onSuccess: () => {
        successToast("Zaktualizowano artykuł");
    },
    onError: (data: ErrorResponse) => {
        errorToast(data.response.data.message);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["articles"] })
});

export default useEditArticle;