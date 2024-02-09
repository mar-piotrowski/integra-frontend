import {useQuery} from "react-query";
import {ErrorResponse} from "../../api/types/dto";
import {DocumentDetails, DocumentType} from "../../api/types/documentTypes";
import documentService from "../../api/services/documentService";

const useDocuments = (documentsFilter: DocumentType[], key: string) => useQuery<DocumentDetails[], ErrorResponse>({
    queryKey: [key],
    queryFn: async () => (await documentService.getAll(documentsFilter)).data.documents,
    refetchOnWindowFocus: false
});

export default useDocuments;
