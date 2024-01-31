import { Grid, Typography } from "@mui/material";
import FormDate from "../../../components/form/FormDate";
import FormInput from "../../../components/form/FormInput";
import React from "react";
import {Control} from "react-hook-form";

interface DocumentBaseInfoProps {
    control: Control<Document>
}

const DocumentBaseInfo = ({ control }: DocumentBaseInfoProps) => {
    return (
        <Grid container item md={12} spacing={2}>
            <Grid item>
                <Typography variant="h4">Podstawowe informacje</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormInput name={"number"} label={"Numer faktury"} control={control} />
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
        </Grid>
    );
};

export default DocumentBaseInfo;