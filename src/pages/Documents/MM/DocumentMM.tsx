import {Button, Grid, Typography} from "@mui/material";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {DocumentDetails} from "../../../api/types/documentTypes";
import {defaultValues} from "../../Invoices/Invoices";
import DocumentArticle from "../../../features/document/DocumentArticle";
import DocumentMmBaseInfo from "./DocumentMmBaseInfo";

const DocumentMM = () => {
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
                    <Grid item container>
                        <Grid item xs={6}>
                            <Typography variant={"h3"} mb={2}>Wystawianie dokumentu MM</Typography>
                        </Grid>
                        <Grid item xs={6} sx={{display: "flex", justifyContent: "flex-end", gap: "10px",}}>
                            <Button disableElevation variant="contained" type="submit" color="primary">
                                Zapisz na stale
                            </Button>
                            <Button disableElevation variant="contained" type="submit" color="primary">
                                Zapisz tymczasowo
                            </Button>
                            <Button disableElevation variant="contained" color="error">
                                Anuluj
                            </Button>
                        </Grid>
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