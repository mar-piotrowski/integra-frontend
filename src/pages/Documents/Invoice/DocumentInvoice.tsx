import {Grid} from "@mui/material";
import React, {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import DocumentInvoiceBaseInfo from "./DocumentInvoiceBaseInfo";
import DocumentArticle from "../../../features/document/DocumentArticle";
import DocumentContractor from "../../../features/document/DocumentContractor";
import DocumentCalculations from "../../../features/document/DocumentCalculations";
import {DocumentDetails, DocumentType} from "../../../api/types/documentTypes";
import {ContractorDto} from "../../../api/types/contractorTypes";
import {defaultValues} from "../../Invoices/Invoices";
import {useNavigate} from "react-router-dom";
import useCreateDocument from "../../../hooks/documents/useCreateDocument";
import DocumentHeader from "../../../features/document/DocumentHeader";

const DocumentInvoice = () => {
    const navigate = useNavigate();
    const [lock, setLock] = useState(false);
    const {mutate: createDocumentMutate, isSuccess: createDocumentSuccess} = useCreateDocument();
    const {control, handleSubmit, setValue} = useForm<DocumentDetails>({
        defaultValues,
    });

    useEffect(() => {
        if (createDocumentSuccess)
            navigate("/management-panel/invoices")
    }, [createDocumentSuccess]);

    const onSubmitHandler: SubmitHandler<DocumentDetails> = (data) => {
        createDocumentMutate({
            ...data,
            type: DocumentType.Invoice,
            locked: lock,
            contractorId: data.contractor!.id,
            articles: data.articles.map(article => ({
                id: article.id,
                amount: article.amount
            }))
        });
    };

    const handleSetContractor = (contractor: ContractorDto) => {
        setValue("contractor", contractor);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid sx={{flexGrow: 1}} container spacing={4}>
                    <Grid item xs={12}>
                        <DocumentHeader
                            title={"Faktura"}
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
