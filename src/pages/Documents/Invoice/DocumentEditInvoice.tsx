import {Button, Grid, Typography} from "@mui/material";
import React, {useEffect, useState } from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import DocumentInvoiceBaseInfo from "./DocumentInvoiceBaseInfo";
import DocumentArticle from "../../../features/document/DocumentArticle";
import DocumentContractor from "../../../features/document/DocumentContractor";
import DocumentCalculations from "../../../features/document/DocumentCalculations";
import {DocumentDetails, DocumentType} from "../../../api/types/documentTypes";
import {ContractorDto} from "../../../api/types/contractorTypes";
import {defaultValues} from "../../Invoices/Invoices";
import {useNavigate, useParams } from "react-router-dom";
import useEditDocument from "../../../hooks/documents/useEditDocument";
import useDocument from "../../../hooks/documents/useDocument";
import DocumentHeader from "../../../features/document/DocumentHeader";

const DocumentInvoice = () => {
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
            navigate("/management-panel/invoices")
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
            type: DocumentType.Invoice,
            locked: lock,
            contractorId: data.contractor?.id ?? null,
            articles: data.articles.map(article => ({
                id: article.id,
                amount: article.amount
            }))
        });
        setLock(false)
    };


    const handleSetContractor = (contractor: ContractorDto) => {
        setValue("contractor", contractor);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid sx={{flexGrow: 1}} container spacing={4}>
                    <Grid item container>
                        <DocumentHeader
                            title={`Edycja faktury nr: ${document?.number}`}
                            setLockDocument={() => setLock(true)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <DocumentInvoiceBaseInfo control={control}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <DocumentContractor setContractor={handleSetContractor} control={control}/>
                    </Grid>
                    <Grid item md={12} lg={4}>
                        <DocumentCalculations control={control} setValue={setValue}/>
                    </Grid>
                    <Grid item xs={12}>
                        <DocumentArticle control={control}/>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default DocumentInvoice;
