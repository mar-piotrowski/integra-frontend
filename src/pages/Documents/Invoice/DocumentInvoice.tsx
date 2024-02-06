import {Button, Grid, Typography} from "@mui/material";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import DocumentInvoiceBaseInfo from "./DocumentInvoiceBaseInfo";
import DocumentArticle from "../../../features/document/DocumentArticle";
import DocumentContractor from "../../../features/document/DocumentContractor";
import DocumentCalculations from "../../../features/document/DocumentCalculations";
import {DocumentDetails} from "../../../api/types/documentTypes";
import {ContractorDto} from "../../../api/types/contractorTypes";
import {defaultValues} from "../../Invoices/Invoices";

const DocumentInvoice = () => {
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
                    <Grid item container>
                        <Grid item xs={6}>
                            <Typography variant={"h3"} mb={2}>Wystawianie Faktury</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{display: "flex", justifyContent: "flex-end", gap: "10px",}}>
                            <Button disableElevation variant="contained" type="submit" color="primary"> Zapisz na stale </Button>
                            <Button disableElevation variant="contained" type="submit" color="primary"> Zapisz tymczasowo</Button>
                            <Button disableElevation variant="contained" color="error"> Anuluj </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <DocumentInvoiceBaseInfo control={control}/>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <DocumentContractor setContractor={handleSetContractor} control={control}/>
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

export default DocumentInvoice;
