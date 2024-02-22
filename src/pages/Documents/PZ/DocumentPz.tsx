import React, {useEffect, useState} from "react";
import {DocumentDetails, DocumentType} from "../../../api/types/documentTypes";
import {SubmitHandler, useForm} from "react-hook-form";
import {defaultValues} from "../../Invoices/Invoices";
import {Grid} from "@mui/material";
import DocumentCalculations from "../../../features/document/DocumentCalculations";
import DocumentArticle from "../../../features/document/DocumentArticle";
import DocumentPzBaseInfo from "./DocumentPzBaseInfo";
import DocumentContractor from "../../../features/document/DocumentContractor";
import {ContractorDto} from "../../../api/types/contractorTypes";
import {useNavigate} from "react-router-dom";
import useCreateDocument from "../../../hooks/documents/useCreateDocument";
import DocumentHeader from "../../../features/document/DocumentHeader";

const DocumentPz = () => {
    const navigate = useNavigate();
    const [lock, setLock] = useState(false);
    const {mutate: createDocumentMutate, isSuccess: createDocumentSuccess} = useCreateDocument();
    const {control, handleSubmit, setValue} = useForm<DocumentDetails>({
        defaultValues,
    });

    useEffect(() => {
        if (createDocumentSuccess)
            navigate("/management-panel/stock-documents")
    }, [createDocumentSuccess]);

    const onSubmitHandler: SubmitHandler<DocumentDetails> = (data) => {
        createDocumentMutate({
            ...data,
            type: DocumentType.Pz,
            locked: lock,
            contractorId: data.contractor!.id,
            articles: data.articles.map(article => ({
                id: article.id,
                amount: article.amount
            }))
        });
        setLock(false);
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
                            title={"Przyjęcie zewnętrzne"}
                            setLockDocument={() => setLock(true)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <DocumentPzBaseInfo control={control} setValue={setValue}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <DocumentContractor control={control} setContractor={handleSetContractor}/>
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

export default DocumentPz;