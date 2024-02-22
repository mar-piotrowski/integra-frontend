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
        onSettled: (data, error, variables) => {
            queryClient.invalidateQueries(["stockDocuments"]);
            queryClient.invalidateQueries(["invoices"]);
            queryClient.invalidateQueries([`document_id_${variables.id}`]);
        }
    });
};

export default useEditDocument;