import {Grid} from "@mui/material";
import React, {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {DocumentDetails, DocumentType} from "../../../api/types/documentTypes";
import {defaultValues} from "../../Invoices/Invoices";
import DocumentArticle from "../../../features/document/DocumentArticle";
import DocumentMmBaseInfo from "./DocumentMmBaseInfo";
import {useNavigate, useParams} from "react-router-dom";
import useDocument from "../../../hooks/documents/useDocument";
import useEditDocument from "../../../hooks/documents/useEditContractor";
import DocumentHeader from "../../../features/document/DocumentHeader";

const DocumentMM = () => {
    const {documentId} = useParams();
    const navigate = useNavigate();
    const {
        data: document,
        isSuccess: getDocumentSuccess,
        isError: getDocumentError,
        isLoading: getDocumentLoading
    } = useDocument(parseInt(documentId!));
    const {mutate: editDocumentMutate, isSuccess: editDocumentSuccess} = useEditDocument();
    const [lock, setLock] = useState(false);
    const {control, handleSubmit, setValue, reset} = useForm<DocumentDetails>({
        defaultValues,
    });

    useEffect(() => {
        if (editDocumentSuccess)
            navigate("/management-panel/stock-documents")
    }, [editDocumentSuccess]);

    useEffect(() => {
        if (getDocumentSuccess)
            reset({
                ...document,
                sourceStockId: document.sourceStock?.id,
                targetStockId: document.targetStock?.id
            });
    }, [getDocumentSuccess]);

    if (getDocumentLoading)
        return <div>Pobieranie dokumentu</div>

    if (getDocumentError)
        return <div>Nie udało się pobrać dokumentu</div>

    const onSubmitHandler: SubmitHandler<DocumentDetails> = (data) => {
        editDocumentMutate({
            ...data,
            type: DocumentType.Mm,
            locked: lock,
            contractorId: null,
            articles: data.articles.map(article => ({
                id: article.id,
                amount: article.amount
            }))
        });
        setLock(false);
    };

    return (
        <form onSubmit={handleSubmit(onSubmitHandler)}>
            <Grid sx={{flexGrow: 1}} container spacing={4}>
                <DocumentHeader
                    title={`Edycja przeniesienia magazynowego nr: ${document?.number}`}
                    setLockDocument={() => setLock(true)}
                />
                <Grid item xs={12}>
                    <DocumentMmBaseInfo control={control} setValue={setValue}/>
                </Grid>
                <Grid item xs={12}>
                    <DocumentArticle control={control}/>
                </Grid>
            </Grid>
        </form>
    );
};

export default DocumentMM;