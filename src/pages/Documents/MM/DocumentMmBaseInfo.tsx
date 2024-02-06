import {
    Control, FieldPathValue,
    UseFormSetValue,
} from "react-hook-form";
import {DocumentDetails} from "../../../api/types/documentTypes";
import {Grid, Typography} from "@mui/material";
import FormInput from "../../../components/Form/FormInput";
import FormDate from "../../../components/Form/FormDate";
import React, {useCallback } from "react";
import FormSelect from "../../../components/Form/FormSelect";
import useStocks from "../../../hooks/stock/useStocks";

interface DocumentMmBaseInfoProps {
    control: Control<DocumentDetails>;
    setValue: UseFormSetValue<DocumentDetails>;
}

const DocumentMmBaseInfo = ({control, setValue}: DocumentMmBaseInfoProps) => {
    const {data: stocks} = useStocks();

    const stockOptions = useCallback((fieldName: FieldPathValue<DocumentDetails, any>) => {
            if (stocks == undefined)
                return [];
            return stocks.map(stock => ({
                label: stock.name,
                value: stock.id,
                onClick: () => setValue(fieldName, stock.id)
            }));
        },
        [setValue, stocks]
    );

    return (
        <Grid container item md={12} spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h4">Podstawowe informacje</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormInput name={"number"} label={"Numer dokumentu"} control={control}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormDate label={"Data wystawienia"} name={"issueDate"} control={control}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormSelect
                    label={"Magazyn źródłowy"}
                    name={"sourceStockId"}
                    control={control}
                    options={stockOptions("sourceStockId")}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormSelect
                    label={"Magazyn docelowy"}
                    name={"targetStockId"}
                    control={control}
                    options={stockOptions("targetStockId")}
                />
            </Grid>
        </Grid>
    );
};

export default DocumentMmBaseInfo;
