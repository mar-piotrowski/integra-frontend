import {Grid} from "@mui/material";
import FormInput from "../../../../components/Form/FormInput";
import FormSelect, {FormSelectOption} from "../../../../components/Form/FormSelect";
import FormTextField from "../../../../components/Form/FormTextField";
import React, {useEffect, useState} from "react";
import {Control, UseFormSetValue, useWatch} from "react-hook-form";
import {ArticleForm} from "../ModalArticle";

interface ModalAddArticleDetailsProps {
    control: Control<ArticleForm>
    setValue: UseFormSetValue<ArticleForm>
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

const vats: FormSelectOption[] = [
    {
        label: "23%",
        value: 23
    },
    {
        label: "8%",
        value: 8
    },
    {
        label: "5%",
        value: 5
    },
    {
        label: "0%",
        value: 0
    }
]

type Price = {
    withTax: number;
    withoutTax: number;
}

const ModalAddArticleDetails = ({control, setValue}: ModalAddArticleDetailsProps) => {
    const [sellPrice, setSellPrice] = useState<Price>({
        withoutTax: control._defaultValues.sellPriceWithoutTax ?? 0,
        withTax: control._defaultValues.sellPriceWithTax ?? 0
    });
    const [buyPrice, setBuyPrice] = useState<Price>({
        withoutTax: control._defaultValues.buyPriceWithoutTax ?? 0,
        withTax: control._defaultValues.buyPriceWithTax ?? 0
    });

    const taxWatch = useWatch({name: "tax", control});

    useEffect(() => {
        setSellPrice(prev => ({...prev, withoutTax: parseFloat((prev.withTax / (1 + (taxWatch / 100))).toFixed(2))}));
        setBuyPrice(prev => ({...prev, withoutTax: parseFloat((prev.withTax / (1 + (taxWatch / 100))).toFixed(2))}));
    }, [taxWatch]);

    useEffect(() => {
        changeSellPrice();
    }, [sellPrice]);

    useEffect(() => {
        changeBuyPrice()
    }, [buyPrice]);

    const changeSellPrice = () => {
        setValue("sellPriceWithTax", sellPrice.withTax);
        setValue("sellPriceWithoutTax", sellPrice.withoutTax);
    }

    const changeBuyPrice = () => {
        setValue("buyPriceWithTax", buyPrice.withTax);
        setValue("buyPriceWithoutTax", buyPrice.withoutTax);
    }

    const handleOnChangeSellPrice = (data: string | number, withTax: boolean) => {
        if (data == "") {
            setSellPrice({
                withoutTax: 0,
                withTax: 0
            })
            return;
        }
        if (data == "")
            return {
                withoutTax: 0,
                withTax: 0
            }
        if (typeof data == "string" && data[data.length - 1] == "0" && data[data.length - 2] == ".")
            return;
        if (typeof data == "string" && data[data.length - 1] == ".")
            return;
        if (typeof data == "number" || isNaN(parseFloat(data)))
            return;
        const parsedValue = parseFloat(data);
        handleChangeSellState(parsedValue, withTax);
    }

    const handleChangeSellState = (value: number, withTax: boolean) => {
        setSellPrice(() => {
            if (withTax)
                return {
                    withoutTax: parseFloat((value / (1 + (taxWatch / 100))).toFixed(2)),
                    withTax: value
                }
            return {
                withTax: parseFloat((value * (1 + (taxWatch / 100))).toFixed(2)),
                withoutTax: value
            }
        })
    }

    const handleOnChangeBuyPrice = (data: string | number, withTax: boolean) => {
        if (data == "") {
            setBuyPrice({
                withoutTax: 0,
                withTax: 0
            })
            return;
        }
        if (typeof data == "string" && data[data.length - 1] == "0" && data[data.length - 2] == ".")
            return;
        if (typeof data == "string" && data[data.length - 1] == ".")
            return;
        if (typeof data == "number" || isNaN(parseFloat(data)))
            return;
        const parsedValue = parseFloat(data);
        setBuyPrice(() => {
            if (withTax)
                return {
                    withoutTax: parseFloat((parsedValue / (1 + (taxWatch / 100))).toFixed(2)),
                    withTax: parsedValue
                }
            return {
                withTax: parseFloat((parsedValue * (1 + (taxWatch / 100))).toFixed(2)),
                withoutTax: parsedValue
            }
        })
    }

    return (
        <Grid sx={{flexGrow: 1}} item container spacing={2}>
            <Grid item xs={12}>
                <FormInput name={"name"} label={"Nazwa"} control={control}/>
            </Grid>
            <Grid item sm={12} md={6}>
                <FormInput name={"code"} label={"Kod produktu"} control={control}/>
            </Grid>
            <Grid item sm={12} md={6}>
                <FormInput name={"gtin"} label={"Kod GTIN"} control={control}/>
            </Grid>
            <Grid item sm={12} md={6}>
                <FormSelect name={"measureUnit"} label={"Jednostka miary"} control={control}
                            options={measureUnits}/>
            </Grid>
            <Grid item sm={12} md={6}>
                <FormInput name={"pkwiu"} label={"PKWiU"} control={control}/>
            </Grid>
            <Grid item sm={12} md={6}>
                <FormInput
                    name={"buyPriceWithoutTax"}
                    label={"Cena zakupu netto"}
                    control={control}
                    onChangeInput={(data) => handleOnChangeBuyPrice(data, false)}
                />
            </Grid>
            <Grid item sm={12} md={6}>
                <FormInput
                    name={"buyPriceWithTax"}
                    label={"Cena zakupu brutto"}
                    control={control}
                    onChangeInput={(data) => handleOnChangeBuyPrice(data, true)}
                />
            </Grid>
            <Grid item sm={12} md={6}>
                <FormInput
                    name={"sellPriceWithoutTax"}
                    label={"Cena sprzedaży netto"}
                    control={control}
                    onChangeInput={(data) => handleOnChangeSellPrice(data, false)}
                />
            </Grid>
            <Grid item sm={12} md={6}>
                <FormInput
                    name={"sellPriceWithTax"}
                    label={"Cena sprzedaży brutto"}
                    control={control}
                    onChangeInput={(data) => handleOnChangeSellPrice(data, true)}
                />
            </Grid>
            <Grid item xs={12}>
                <FormSelect name={"tax"} label={"Vat"} control={control} options={vats}/>
            </Grid>
            <Grid item xs={12}>
                <FormTextField name={"description"} label={"Opis"} control={control}/>
            </Grid>
        </Grid>
    )
}

export default ModalAddArticleDetails;