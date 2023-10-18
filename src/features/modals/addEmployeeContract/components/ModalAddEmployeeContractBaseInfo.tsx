import {Control} from "react-hook-form";
import React, {useState} from "react";
import {Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography} from "@mui/material";
import {AddEmployeeContractForm} from "../ModalAddEmployeeContract";
import FormSelect, {FormSelectOption} from "../../../../components/form/FormSelect";
import FormDate from "../../../../components/form/FormDate";
import FormInput from "../../../../components/form/FormInput";

interface ModalAddEmployeeContractBaseInfoProps {
    control: Control<AddEmployeeContractForm>
}

const employmentWorkingTypes: FormSelectOption[] = [
    {
        label: "Umowa o pracę",
        value: 0
    },
    {
        label: "Umowa zlecenie",
        value: 1
    },
    {
        label: "Umowa o dzieło",
        value: 2
    }
]

const jobPostions: FormSelectOption[] = [
    {
        label: "Programista",
        value: 0
    },
    {
        label: "Stolarz",
        value: 1
    }
]

const locations: FormSelectOption[] = [
    {
        label: "Jagiellońska 13B/188 Sosnowiec",
        value: 0
    }
]

const interval: FormSelectOption[] = [
    {
        label: "Miesięczny",
        value: 0
    },
    {
        label: "Tygodniowy",
        value: 1
    }
]

const ModalAddEmployeeContractBaseInfo = ({control}: ModalAddEmployeeContractBaseInfoProps) => {
    const [lowestSalary, setLowestSalary] = useState<boolean>(false);

    return (
        <Grid item container spacing={2}>
            <Grid item xs={12}>
                <TextField label={"Pracownik"} value={"Marcin Piotrowski"}></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormSelect
                    name={"employmentWorkingType"}
                    label={"Rodzaj umowy"}
                    control={control}
                    options={employmentWorkingTypes}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormDate name={"signOnDate"} label={"Data podpisania"} control={control}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormDate name={"startDate"} label={"Data rozpoczęcia pracy"} control={control}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormDate name={"endDate"} label={"Data zwolnienia"} control={control}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormSelect name={"jobPosition"} label={"Stanowisko"} control={control} options={jobPostions}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormSelect name={"locationId"} label={"Miejsce pracy"} control={control} options={locations}/>
            </Grid>
            <Grid item container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant={"subtitle1"}>Wymiar czasu pracy</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormInput name={"workingTimeValue1"} label={""} control={control}/>
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormInput name={"workingTimeValue2"} label={""} control={control}/>
                </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid item container>
                    <Grid item xs={12}>
                        <FormInput name={"salary"} label={"Wynagrodzenie"} control={control} type={"number"}/>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox onClick={() => setLowestSalary(!lowestSalary)}  />} label="Najniższe wynagrodzenie" />
                    </FormGroup>
                </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormSelect name={"salaryInterval"} label={"Interwał wypłat"} control={control} options={interval}/>
            </Grid>
        </Grid>
    )
}

export default ModalAddEmployeeContractBaseInfo;