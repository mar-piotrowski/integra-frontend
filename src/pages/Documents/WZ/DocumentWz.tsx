import React from "react";
import {DocumentDetails} from "../../../api/types/documentTypes";
import {SubmitHandler, useForm} from "react-hook-form";
import {defaultValues} from "../../Invoices/Invoices";
import {Grid} from "@mui/material";
import DocumentCalculations from "../../../features/document/DocumentCalculations";
import DocumentArticle from "../../../features/document/DocumentArticle";
import DocumentContractor from "../../../features/document/DocumentContractor";
import DocumentWzBaseInfo from "./DocumentWzBaseInfo";
import DocumentHeader from "../../../features/document/DocumentHeader";
import {ContractorDto} from "../../../api/types/contractorTypes";

const DocumentWz = () => {
    const {control, handleSubmit, setValue} = useForm<DocumentDetails>({
        defaultValues,
    });

    const onSubmitHandler: SubmitHandler<DocumentDetails> = (data) => {
        console.log(data);
    };

    const handleSetContractor = (contractor: ContractorDto) => {
        setValue("contractor", contractor);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid sx={{flexGrow: 1}} container spacing={4}>
                    <Grid item xs={12}>
                        <DocumentHeader title={"Wydanie zewnętrzne"}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <DocumentWzBaseInfo control={control} setValue={setValue}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <DocumentContractor control={control} setContractor={handleSetContractor}/>
                    </Grid>
                    <Grid item md={12} lg={4}>
                        <DocumentCalculations control={control}/>
                    </Grid>
                    <Grid item xs={12}>
                        <DocumentArticle control={control}/>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default DocumentWz;