import {Grid} from "@mui/material";
import FormInput from "../../../../components/form/FormInput";
import FormSelect, {FormSelectOption} from "../../../../components/form/FormSelect";
import FormTextField from "../../../../components/form/FormTextField";
import React from "react";
import {Control} from "react-hook-form";
import {AddArticleForm} from "../ModalAddArticle";

interface ModalAddArticleDetailsProps {
    control: Control<AddArticleForm>
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

const ModalAddArticleDetails = ({control}: ModalAddArticleDetailsProps) => {
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
                <FormInput name={"buyPrice"} label={"Cena zakupu netto"} control={control}/>
            </Grid>
            <Grid item sm={12} md={6}>
                <FormInput name={"buyPrice"} label={"Cena zakupu brutto"} control={control}/>
            </Grid>
            <Grid item sm={12} md={6}>
                <FormInput name={"sellPrice"} label={"Cena sprzedaży netto"} control={control}/>
            </Grid>
            <Grid item sm={12} md={6}>
                <FormInput name={"sellPrice"} label={"Cena sprzedaży brutto"} control={control}/>
            </Grid>
            <Grid item xs={12}>
                <FormSelect name={"vat"} label={"Vat"} control={control} options={vats}/>
            </Grid>
            <Grid item xs={12}>
                <FormTextField name={"description"} label={"Opis"} control={control}/>
            </Grid>
        </Grid>
    )
}

export default ModalAddArticleDetails;