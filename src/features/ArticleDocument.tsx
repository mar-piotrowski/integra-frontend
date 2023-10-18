import {Box, Button, Grid, Input, Select, TextField} from "@mui/material";
import React from "react";
import {Control, Controller, useFieldArray} from "react-hook-form";
import {GoodsReceivedNoteForm} from "../pages/GoodsReceiveNote";
import FormInput from "../components/form/FormInput";
import FormSelect, {FormSelectOption} from "../components/form/FormSelect";
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

const ArticleDocument = ({control}: ArticleDocumentProps) => {
    const {fields, append, remove, update} = useFieldArray({
        control,
        name: "articles"
    });

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
                                render={({field}) => (
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
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <FormInput
                                                name={`articles.${index}.priceWithoutTax`}
                                                label={"Cena"}
                                                control={control}
                                                type={"number"}
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
                                            <TextField label={"Wartość netto"} value={123}/>
                                        </Grid>
                                        <Grid item>
                                            <TextField label={"Wartość brutto"} value={321}/>
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
                    amount: 0,
                    priceWithoutTax: 0,
                    discount: 0,
                    tax: 0,
                    totalPriceWithoutTax: 0,
                    totalPriceWithTax: 0
                })}>Dodaj produkt</Button>
            </Grid>
        </Grid>
    )
}

export default ArticleDocument;