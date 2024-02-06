import React from "react";
import {DocumentDetails} from "../../../api/types/documentTypes";
import {SubmitHandler, useForm} from "react-hook-form";
import {defaultValues} from "../../Invoices/Invoices";
import {Button, Grid, Typography} from "@mui/material";
import DocumentCalculations from "../../../features/document/DocumentCalculations";
import DocumentArticle from "../../../features/document/DocumentArticle";
import DocumentPzBaseInfo from "./DocumentPzBaseInfo";
import DocumentContractor from "../../../features/document/DocumentContractor";
import {ContractorDto} from "../../../api/types/contractorTypes";

const DocumentPz = () => {
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
                            <Typography variant={"h3"} mb={2}>Przyjęcie zewnętrzne</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{display: "flex", justifyContent: "flex-end", gap: "10px",}}>
                            <Button disableElevation variant="contained" type="submit" color="primary">
                                Zapisz na stale
                            </Button>
                            <Button disableElevation variant="contained" type="submit" color="primary">
                                Zapisz tymczasowo
                            </Button>
                            <Button disableElevation variant="contained" color="error"> Anuluj </Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <DocumentPzBaseInfo control={control} setValue={setValue}/>
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

export default DocumentPz;