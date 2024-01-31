import {Button, Divider, Grid, Typography} from "@mui/material";
import React from "react";
import { Article } from "../../../constants/models";
import { SubmitHandler, useForm } from "react-hook-form";
import DocumentContractor from "./DocumentContractor";
import DocumentBaseInfo from "./DocumentBaseInfo";
import ArticleDocument from "../../../features/ArticleDocument";

enum DocumentType {
    Unknown,
    Invoice,
    Wz,
    Pz,
    Rw,
    Pw,
}

export interface Document {
    type: DocumentType;
    number: string;
    issueDate: string;
    receptionDate: string;
    paymentDate: string;
    contractorId: number;
    paid: boolean;
    articles: Article[]
}

const defaultValues: Document = {
    type: DocumentType.Unknown,
    number: "",
    issueDate: "",
    receptionDate: "",
    paymentDate: "",
    contractorId: 0,
    paid: false,
    articles: []
}

const DocumentCreator = () => {
    const { control, handleSubmit } = useForm<Document>({
        defaultValues,
    });

    const onSubmitHandler: SubmitHandler<Document> = (data: Document) => {
        console.log(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid sx={{ flexGrow: 1 }} container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant={"h3"} mb={2}>Wystawianie dokumentu PZ</Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <DocumentBaseInfo control={control} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <DocumentContractor />
                    </Grid>
                    <Grid item container md={12} lg={4}>
                        <Grid item>
                            <Typography variant="h4">Kalkulacja</Typography>
                        </Grid>
                    </Grid>
                     <Grid item xs={12}>
                        <Typography variant={"h4"} mb={1}>Produkty</Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <ArticleDocument control={control} />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "10px",
                        }}
                    >
                        <Button variant="contained" color="error">
                            Anuluj
                        </Button>
                        <Button variant="contained" type="submit">
                            Dodaj
                        </Button>
                    </Grid>
                </Grid>
            </form >
        </>
    );
};

export default DocumentCreator;
