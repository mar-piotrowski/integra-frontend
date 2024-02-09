import {Button, Divider, Grid, TextField, Typography} from "@mui/material";
import React from "react";
import {Control, Controller, useFieldArray, useWatch} from "react-hook-form";
import FormInput from "../../components/Form/FormInput";
import FormSelect, {FormSelectOption, FormSelectOptionButton} from "../../components/Form/FormSelect";
import {useArticles} from "../../hooks/article/useArticles";
import ModalArticle from "../modals/addArticle/ModalArticle";
import {useBoolean} from "../../hooks/useBoolean";
import {DocumentDetails} from "../../api/types/documentTypes";

interface ArticleDocumentProps {
    control: Control<DocumentDetails>
}

const emptyArticle = {
    name: "",
    measureUnit: "",
    amount: 1,
    sellPriceWithoutTax: 0,
    sellPriceWithTax: 0,
    tax: 0,
};

const DocumentArticle = ({control}: ArticleDocumentProps) => {
    const {
        value: createArticleModal,
        setTrue: openCreateArticleModal,
        setFalse: closeCreateArticleModal
    } = useBoolean(false);
    const {data: articles, refetch} = useArticles();
    const {fields, append, remove, update} = useFieldArray({control, name: "articles"});

    const watchArticles = useWatch({name: "articles", control});

    const productSelectButtons: FormSelectOptionButton[] = [
        {
            label: "Dodaj produkt",
            onClick: openCreateArticleModal
        }
    ];

    const handleCloseCreateArticleModal = () => {
        closeCreateArticleModal();
        refetch()
    }

    const articlesToChoose = (lineIndex: number): FormSelectOption[] | undefined =>
        articles?.map((article) => ({
            label: article.name,
            value: article.name,
            onClick: () => {
                const product = articles.find(articleUpdate => articleUpdate.id == article.id);
                update(lineIndex, {...product!, amount: 1})
            },
        }));

    const displayProductPriceWithTax = (index: number) => {
        if (watchArticles[index] == undefined || watchArticles[index].name == "") return 0;
        return ((watchArticles[index]?.sellPriceWithTax * (1 - (watchArticles[index].tax / 100))) * watchArticles[index].amount).toFixed(2);
    }

    const displayProductPriceWithoutTax = (index: number) => {
        if (watchArticles[index] == undefined || watchArticles[index].name == "") return 0;
        return (watchArticles[index]?.sellPriceWithoutTax * watchArticles[index].amount).toFixed(2);
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant={"h4"} mb={1}>Produkty</Typography>
                    <Divider/>
                </Grid>
                <Grid item container maxHeight={"400px"} sx={{overflowY: "auto"}}>
                    {
                        fields.map((field, index) => (
                            <Controller
                                key={field.id}
                                control={control}
                                name={`articles`}
                                render={() => (
                                    <Grid container spacing={1} alignItems={"center"} xs={12} mb={2}>
                                        <Grid item xs={3}>
                                            <FormSelect
                                                name={`articles.${index}.name`}
                                                label={"Produkt"}
                                                control={control}
                                                options={articlesToChoose(index) ?? []}
                                                buttons={productSelectButtons}
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
                                                disabled
                                                name={`articles.${index}.measureUnit`}
                                                label={"Jednostka miary"}
                                                control={control}
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <FormInput
                                                disabled
                                                name={`articles.${index}.tax`}
                                                label={"Podatek"}
                                                control={control}
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <FormInput
                                                disabled
                                                name={`articles.${index}.sellPriceWithoutTax`}
                                                label={"Cena netto"}
                                                control={control}
                                                type={"number"}
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <FormInput
                                                disabled
                                                name={`articles.${index}.sellPriceWithTax`}
                                                label={"Cena brutto"}
                                                control={control}
                                                type={"number"}
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <TextField
                                                disabled
                                                label={"Razem netto"}
                                                value={`${displayProductPriceWithoutTax(index)}`}
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <TextField
                                                disabled
                                                label={"Razem brutto"}
                                                value={`${displayProductPriceWithTax(index)}`}
                                            />
                                        </Grid>
                                        <Grid item xs={1}>
                                            <Button
                                                variant={"outlined"}
                                                sx={{cursor: "pointer"}}
                                                color={"error"}
                                                onClick={() => remove(index)}
                                            >
                                                Usuń
                                            </Button>
                                        </Grid>
                                    </Grid>
                                )}
                            />
                        ))
                    }
                </Grid>
                <Grid item>
                    <Button variant={"contained"} onClick={() => append({id: 0, pkwiu: "", ...emptyArticle})}>
                        Dodaj produkt
                    </Button>
                </Grid>
            </Grid>
            {
                createArticleModal
                    ? <ModalArticle open={createArticleModal} onClose={handleCloseCreateArticleModal}/>
                    : null
            }
        </>
    )
}

export default DocumentArticle;