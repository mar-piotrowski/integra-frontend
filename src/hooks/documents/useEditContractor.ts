import {useMutation, useQueryClient} from "react-query";
import {errorToast, successToast} from "../../utils/toastUtil";
import documentService from "../../api/services/documentService";
import {ErrorResponse} from "../../api/types/dto";

const useEditDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: documentService.edit,
        onSuccess: () => {
            successToast("Utworzono dokument");
        },
        onError: (data: ErrorResponse) => {
            errorToast(data.response.data.message);
        },
        onSettled: () => queryClient.invalidateQueries({queryKey: ["stockDocuments", "invoices"]})
    });
};

export default useEditDocument;