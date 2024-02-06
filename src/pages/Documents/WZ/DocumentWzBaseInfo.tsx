import useStocks from "../../../hooks/stock/useStocks";
import React, {useMemo} from "react";
import FormSelect, {FormSelectOption} from "../../../components/Form/FormSelect";
import {Grid, Typography} from "@mui/material";
import FormInput from "../../../components/Form/FormInput";
import FormDate from "../../../components/Form/FormDate";
import {DocumentDetails} from "../../../api/types/documentTypes";
import {Control, UseFormSetValue} from "react-hook-form";

interface DocumentWzBaseInfoProps {
    control: Control<DocumentDetails>;
    setValue: UseFormSetValue<DocumentDetails>;
}

const DocumentWzBaseInfo = ({control, setValue}: DocumentWzBaseInfoProps) => {
    const {data: stocks} = useStocks();

    const stockOptions = useMemo<FormSelectOption[]>(() => {
            if (stocks == undefined)
                return [];
            return stocks.map(stock => ({
                label: stock.name,
                value: stock.id,
                onClick: () => setValue("sourceStockId", stock.id)
            }));
        },
        [setValue, stocks]
    );

    return (
        <Grid container item md={12} spacing={2}>
            <Grid item>
                <Typography variant="h4">Podstawowe informacje</Typography>
            </Grid>
            <Grid item xs={12}>
                <FormInput name={"number"} label={"Numer dokumentu"} control={control}/>
            </Grid>
            <Grid item xs={12}>
                <FormDate label={"Data wystawienia"} name={"issueDate"} control={control}/>
            </Grid>
            <Grid item xs={12}>
                <FormSelect
                    label={"Magazyn źródłowy"}
                    name={"sourceStockId"}
                    control={control}
                    options={stockOptions}
                />
            </Grid>
        </Grid>
    );
};

export default DocumentWzBaseInfo;