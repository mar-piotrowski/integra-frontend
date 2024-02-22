import React from "react";
import {Grid, Typography} from "@mui/material";
import DocumentCalculationValue from "./DocumentCalculationValue";
import {Control, UseFormSetValue, useWatch} from "react-hook-form";
import {DocumentArticleDto, DocumentDetails} from "../../api/types/documentTypes";

interface DocumentCalculationsControlProps {
    control: Control<DocumentDetails>;
    setValue: UseFormSetValue<DocumentDetails>;
}

const DocumentCalculations = ({control, setValue}: DocumentCalculationsControlProps) => {
    const articlesWatch = useWatch({name: "articles", control});
    const discountWatch = useWatch({name: "discount", control});

    const calculateTotalWithTax = () => {
        if (articlesWatch.length == 0) return 0;
        const total = articlesWatch.reduce((acc: number, curr: DocumentArticleDto) =>
            acc += curr.sellPriceWithTax * curr.amount, 0
        );
        const result = isNaN(total) ? 0 : (total * (1 - (discount() / 100))).toFixed(2);
        setValue("totalAmountWithTax", result as number);
        return result as number;
    }

    const calculateTotalWithoutTax = () => {
        if (articlesWatch.length == 0) return 0;
        const total = articlesWatch.reduce((acc: number, curr: DocumentArticleDto) =>
            acc += curr.sellPriceWithoutTax * curr.amount, 0
        );
        const result = isNaN(total) ? 0 : (total * (1 - (discount() / 100))).toFixed(2);
        setValue("totalAmountWithoutTax", result as number);
        return result as number;
    }

    const discount = () => isNaN(discountWatch) ? 0 : discountWatch;

    return (
        <Grid container spacing={"5px"}>
            <Grid item>
                <Typography variant="h4">Kalkulacja</Typography>
            </Grid>
            <Grid item xs={12}>
                <DocumentCalculationValue
                    title={"Rabat"}
                    value={discount()}
                    sign={"%"}
                />
            </Grid>
            <Grid item xs={12}>
                <DocumentCalculationValue title={"Razem brutto"} value={calculateTotalWithTax()} sign={"PLN"}/>
            </Grid>
            <Grid item xs={12}>
                <DocumentCalculationValue title={"Razem netto"} value={calculateTotalWithoutTax()} sign={"PLN"}/>
            </Grid>
        </Grid>
    );
};

export default DocumentCalculations;
