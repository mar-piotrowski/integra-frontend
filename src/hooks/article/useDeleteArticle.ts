import { useMutation } from "react-query";
import { articleService } from "../../api/services/articleService";
import { errorToast, successToast } from "../../utils/toastUtil";
import { queryClient } from "../../App";
import { ErrorResponse } from "../../api/types/dto";

const useDeleteArticle = () => useMutation({
    mutationFn: articleService.delete,
    onSuccess: () => {
        successToast("Usunięto artykuł");
    },
    onError: (data: ErrorResponse) => {
        errorToast(data.response.data.message);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["articles"] })
});

export default useDeleteArticle;

