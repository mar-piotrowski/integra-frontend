import {useQuery} from "react-query";
import {ErrorResponse} from "../../api/types/dto";
import {DocumentDto} from "../../api/types/documentTypes";
import documentService from "../../api/services/documentService";

const useDocument = (documentId: number) => useQuery<DocumentDto, ErrorResponse>({
    queryKey: [`document_id_${documentId}`],
    queryFn: async () => (await documentService.get(documentId)).data,
    refetchOnWindowFocus: false
});

export default useDocument;
