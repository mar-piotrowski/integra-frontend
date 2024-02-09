import React from "react";
import {DocumentDetails} from "../../../api/types/documentTypes";
import {SubmitHandler, useForm} from "react-hook-form";
import {defaultValues} from "../../Invoices/Invoices";
import {Grid} from "@mui/material";
import DocumentCalculations from "../../../features/document/DocumentCalculations";
import DocumentArticle from "../../../features/document/DocumentArticle";
import DocumentPwBaseInfo from "./DocumentPwBaseInfo";

const DocumentPw = () => {
    const {control, handleSubmit, setValue} = useForm<DocumentDetails>({
        defaultValues,
    });

    const onSubmitHandler: SubmitHandler<DocumentDetails> = (data) => {
        console.log(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid sx={{flexGrow: 1}} container spacing={4}>

                    <Grid item xs={12} md={6}>
                        <DocumentPwBaseInfo control={control} setValue={setValue}/>
                    </Grid>
                    <Grid item md={12} lg={6}>
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

export default DocumentPw;