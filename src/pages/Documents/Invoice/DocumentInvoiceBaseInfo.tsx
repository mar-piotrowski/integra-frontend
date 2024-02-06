import { Grid, Typography } from "@mui/material";
import FormDate from "../../../components/Form/FormDate";
import FormInput from "../../../components/Form/FormInput";
import React from "react";
import {Control} from "react-hook-form";
import {DocumentDetails} from "../../../api/types/documentTypes";

interface DocumentBaseInfoProps {
    control: Control<DocumentDetails>
}

const DocumentInvoiceBaseInfo = ({ control }: DocumentBaseInfoProps) => {
    return (
        <Grid container item md={12} spacing={2}>
            <Grid item>
                <Typography variant="h4">Podstawowe informacje</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormInput name={"number"} label={"Numer dokumentu"} control={control} />
            </Grid>
            <Grid item xs={12}>
                <FormDate label={"Data wystawienia"} name={"issueDate"} control={control} />
            </Grid>
            <Grid item xs={12}>
                <FormDate label={"Data wpływu"} name={"paymentDate"} control={control} />
            </Grid>
            <Grid item xs={12}>
                <FormDate label={"Data odbioru"} name={"receptionDate"} control={control} />
            </Grid>
            <Grid item xs={12}>
                <FormInput type={"number"} label={"Rabat"} name={"discount"} control={control} />
            </Grid>
        </Grid>
    );
};

export default DocumentInvoiceBaseInfo;