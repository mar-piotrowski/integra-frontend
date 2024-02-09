import axios from "../axios";
import {
    CreateDocumentRequest,
    DocumentDetails,
    DocumentResponse,
    DocumentType,
    EditDocumentRequest
} from "../types/documentTypes";
import endpoint from "../endpoint";

const documentService = {
    getAll: (documentsFilter: DocumentType[]) => axios.get<DocumentResponse>(`${endpoint.documents}${documentsQueryFilter(documentsFilter)}`),
    get: (documentId: number) => axios.get<DocumentDetails>(`${endpoint.documents}/${documentId}`),
    create: (document: CreateDocumentRequest) => axios.post(`${endpoint.documents}`, document),
    edit: (document: EditDocumentRequest) => axios.post(`${endpoint.documents}`, document)
};

const documentsQueryFilter = (documentsFilter: DocumentType[]) => {
    if (documentsFilter.length == 0)
        return "";
    const result = documentsFilter.map(documentFilter => `documentType=${documentFilter}`).join("&");
    return `?${result}`;
}

export default documentService;