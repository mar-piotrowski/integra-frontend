import {Button, Grid, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {DocumentDetails, DocumentType} from "../../../api/types/documentTypes";
import {defaultValues} from "../../Invoices/Invoices";
import DocumentArticle from "../../../features/document/DocumentArticle";
import DocumentMmBaseInfo from "./DocumentMmBaseInfo";
import { useNavigate } from "react-router-dom";
import useCreateDocument from "../../../hooks/documents/useCreateDocument";
import DocumentHeader from "../../../features/document/DocumentHeader";

const DocumentMM = () => {
    const navigate = useNavigate();
    const [lock, setLock] = useState(false);
    const {mutate: createDocumentMutate, isSuccess: createDocumentSuccess} = useCreateDocument();
    const {control, handleSubmit, setValue} = useForm<DocumentDetails>({
        defaultValues,
    });

    useEffect(() => {
        if(createDocumentSuccess)
            navigate("/management-panel/stock-documents")
    }, [createDocumentSuccess]);

    const onSubmitHandler: SubmitHandler<DocumentDetails> = (data) => {
        createDocumentMutate({
            ...data,
            type: DocumentType.Mm,
            contractorId: null,
            locked: lock,
            articles: data.articles.map(article => ({
                id: article.id,
                amount: article.amount
            }))
        });
        setLock(false)
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid sx={{flexGrow: 1}} container spacing={4}>
                    <Grid item xs={12}>
                        <DocumentHeader
                            title={"Przeniesienie magazynowe"}
                            setLockDocument={() => setLock(true)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <DocumentMmBaseInfo control={control} setValue={setValue}/>
                    </Grid>
                    <Grid item xs={12}>
                        <DocumentArticle control={control}/>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default DocumentMM;