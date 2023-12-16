import {useMutation} from "react-query";
import {articleService} from "../../api/services/articleService";
import {errorToast, successToast} from "../../utils/toastUtil";
import {queryClient} from "../../App";
import {ErrorResponse} from "../../api/types/dto";

const useCreateArticle = () => useMutation(articleService.create, {
    onSuccess: () => {
        successToast("Dodano artykuł");
    },
    onError: (data: ErrorResponse) => {
        errorToast(data.response.data.message);
    },
    onSettled: () => queryClient.invalidateQueries({queryKey: ["articles"]})
})

export default useCreateArticle;