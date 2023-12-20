import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Control, Controller, useFieldArray, useWatch } from "react-hook-form";
import { GoodsReceivedNoteForm } from "../pages/manegementPanel/documents/PZ";
import FormInput from "../components/form/FormInput";
import FormSelect, { FormSelectOption } from "../components/form/FormSelect";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface ArticleDocumentProps {
    control: Control<GoodsReceivedNoteForm>
}

const measureUnits: FormSelectOption[] = [
    {
        label: "szt",
        value: "szt"
    },
    {
        label: "litry",
        value: "litry"
    }
]

const ArticleDocument = ({ control }: ArticleDocumentProps) => {
    const [totalPriceWithTax, setTotalPriceWithTax] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "articles"
    });

    const watch = useWatch({
        name: "articles",
        control
    })

    useEffect(() => {
        watch.forEach((article, index) => {
            // update(index, {
            //     ...article,
            //     totalPriceWithoutTax: article.amount * article.priceWithoutTax
            // })
        })
    }, [watch]);

    const taxes: FormSelectOption[] = [
        {
            label: "23%",
            value: 0,
        }
    ]

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {
                    fields.map((field, index) => (
                        <Box key={field.id} mb={1}>
                            <Controller
                                control={control}
                                name={`articles`}
                                render={() => (
                                    <Grid container spacing={1} alignItems={"center"}>
                                        <Grid item>
                                            <FormInput
                                                name={`articles.${index}.code`}
                                                label={"Produkt"}
                                                control={control}
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <FormSelect
                                                name={`articles.${index}.measureUnit`}
                                                label={"Jednostka miary"}
                                                control={control}
                                                options={measureUnits}
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <FormInput
                                                name={`articles.${index}.amount`}
                                                label={"Ilosc"}
                                                control={control}
                                                type={"number"}
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <FormInput
                                                name={`articles.${index}.priceWithoutTax`}
                                                label={"Cena"}
                                                control={control}
                                                type={"number"}
                                                onChangeInput={(price) => {
                                                    // const article = watch[index];
                                                    // console.log(article);
                                                    // setTotalPrice(article.amount * article.totalPriceWithoutTax);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <FormSelect
                                                name={`articles.${index}.tax`}
                                                label={"Podatek"}
                                                control={control}
                                                options={taxes}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <TextField label={"Wartość netto"} value={totalPrice} />
                                        </Grid>
                                        <Grid item>
                                            <TextField label={"Wartość brutto"} value={totalPriceWithTax} />
                                        </Grid>
                                        <Grid item>
                                            <DeleteForeverIcon
                                                sx={{
                                                    cursor: "pointer",
                                                    fontSize: "25px"
                                                }}
                                                color={"error"}
                                                onClick={() => remove(index)}
                                            />
                                        </Grid>
                                    </Grid>
                                )}
                            />
                        </Box>
                    ))
                }
            </Grid>
            <Grid item>
                <Button variant={"contained"} onClick={() => append({
                    code: "",
                    measureUnit: "",
                    amount: 1,
                    priceWithoutTax: 0,
                    discount: 0,
                    tax: 0,
                    totalPriceWithoutTax: 0,
                    totalPriceWithTax: 0
                })}>
                    Dodaj produkt
                </Button>
            </Grid>
        </Grid>
    )
}

export default ArticleDocument;