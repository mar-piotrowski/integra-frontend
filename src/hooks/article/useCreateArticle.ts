import {useMutation, useQueryClient} from "react-query";
import { articleService } from "../../api/services/articleService";
import { errorToast, successToast } from "../../utils/toastUtil";
import { ErrorResponse } from "../../api/types/dto";

const useCreateArticle = () => {
    const queryClient = useQueryClient();
   return useMutation({
        mutationFn: articleService.create,
        onSuccess: () => {
            successToast("Dodano artykuł");
        },
        onError: (data: ErrorResponse) => {
            errorToast(data.response.data.message);
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ["articles"] })
    })
}

export default useCreateArticle;