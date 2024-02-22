import {useMutation, useQueryClient} from "react-query";
import {errorToast, successToast} from "../../utils/toastUtil";
import documentService from "../../api/services/documentService";
import {ErrorResponse} from "../../api/types/dto";

const useCreateDocument = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: documentService.create,
        onSuccess: () => {
            successToast("Utworzono dokument");
        },
        onError: (data: ErrorResponse) => {
            errorToast(data.response.data.message);
        },
        onSettled: () => {
            queryClient.invalidateQueries(["stockDocuments"]);
            queryClient.invalidateQueries(["invoices"]);
        }
    });
};

export default useCreateDocument;