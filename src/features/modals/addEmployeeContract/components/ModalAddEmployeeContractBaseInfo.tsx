import {Control} from "react-hook-form";
import React, {useState} from "react";
import {Checkbox, FormControlLabel, FormGroup, Grid, TextField, Typography} from "@mui/material";
import FormSelect, {FormSelectOption} from "../../../../components/form/FormSelect";
import FormDate from "../../../../components/form/FormDate";
import FormInput from "../../../../components/form/FormInput";
import {Contract} from "../../../../api/types/documentTypes";

interface ModalAddEmployeeContractBaseInfoProps {
    control: Control<Contract>
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
        value: 1
    },
    {
        label: "Stolarz",
        value: 2
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
                    name={"contractType"}
                    label={"Rodzaj umowy"}
                    control={control}
                    options={employmentWorkingTypes}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <FormDate name={"signedOnDate"} label={"Data podpisania"} control={control}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormDate name={"startDate"} label={"Data rozpoczęcia pracy"} control={control}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormDate name={"endDate"} label={"Data zwolnienia"} control={control}/>
            </Grid>
            <Grid item xs={12} md={6}>
                <FormSelect name={"jobPositionId"} label={"Stanowisko"} control={control} options={jobPostions}/>
            </Grid>
            <Grid item container spacing={1}>
                <Grid item xs={12}>
                    <Typography variant={"subtitle1"}>Wymiar czasu pracy</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormInput name={"workingHours1"} label={""} control={control}/>
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormInput name={"workingHours2"} label={""} control={control}/>
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
        </Grid>
    )
}

export default ModalAddEmployeeContractBaseInfo;