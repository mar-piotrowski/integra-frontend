import { Grid, TextField, Typography, FormGroup, FormControlLabel, Checkbox, Box, Button, keyframes } from "@mui/material";
import React, { useState, useEffect } from "react";
import FormCheckBox from "../../components/form/FormCheckBox";
import FormDate from "../../components/form/FormDate";
import FormInput from "../../components/form/FormInput";
import FormSelect from "../../components/form/FormSelect";
import useGetJobPositions from "../../hooks/jobPositions/useGetJobPositions";
import useCreateContract from "../../hooks/contract/useCreateContract";
import { Contract } from "../../api/types/documentTypes";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../../hooks/auth/useAuth";
import CancelCreateContractDialog from "../../features/dialog/CancelCreateContractDialog";
import { useNavigate } from "react-router-dom";

type Salary = {
    withTax: number;
    withoutTax: number;
}

const defaultValuesSalary: Salary = {
    withoutTax: 0,
    withTax: 0
}

const defaultValues: Contract = {
    userId: 0,
    salaryWithTax: 0,
    salaryWithoutTax: 0,
    contractType: 0,
    workingHours1: 0,
    workingHours2: 0,
    startDate: "",
    endDate: null,
    signedOnDate: null,
    jobFound: true,
    pensionFund: false,
    voluntaryContribution: false,
    profitableFund: false,
    fgsp: false,
    pitExemption: false,
    taxRelief: false,
    jobPositionId: 0,
    insuranceCodeId: 0,
    deductibleCostId: 0,
    active: false
}

const CreateContract = () => {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [lowestSalary, setLowestSalary] = useState<boolean>(false);
    const [salary, setSalary] = useState<Salary>(defaultValuesSalary);
    const { auth } = useAuth();
    const { data: jobPositions } = useGetJobPositions();
    const { mutate: createContractMutation } = useCreateContract();
    const { control, reset, handleSubmit, setValue: setValueForm } = useForm<Contract>({
        defaultValues
    });
    const navigate = useNavigate();

    useEffect(() => {
        changeSalary();
    }, [salary])

    useEffect(() => {
        if (lowestSalary) {
            setValueForm("salaryWithTax", 3000);
            setValueForm("salaryWithoutTax", 3000 * 0.77)
            return;
        }
        changeSalary();
    }, [lowestSalary])

    const handleLowestSalary = () => setLowestSalary(!lowestSalary);

    const changeSalary = () => {
        setValueForm("salaryWithTax", salary.withTax);
        setValueForm("salaryWithoutTax", salary.withoutTax);
    }

    const onSubmitHandler: SubmitHandler<Contract> = (data) => {
        data.userId = auth!.userId;
        createContractMutation(data);
    };

    const handleOpenDialog = () => setOpenDialog(true);

    const handleCloseDialog = () => setOpenDialog(false);

    const handleOnChangeSalary = (data: string | number, withTax: boolean) => {
        if (typeof (data) != "number")
            return;
        setSalary(() => {
            if (withTax)
                return {
                    withoutTax: Math.floor(data * 0.77),
                    withTax: data
                }
            return {
                withTax: Math.floor(data * 1.23),
                withoutTax: data
            }
        })
    }

    const selectJobPositions = jobPositions?.map((jobPosition: JobPosition) => ({
        label: jobPosition.title,
        value: jobPosition.id
    }))

    return (
        <>
            <Grid container spacing={2} >
                <Grid item container xs={12} md={6} >
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <Grid item container xs={12} spacing={2}>
                            <Grid item xs={12}>
                                <TextField label={"Pracownik"} value={"Marcin Piotrowski"} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormSelect
                                    name={"contractType"}
                                    label={"Rodzaj umowy"}
                                    control={control}
                                    options={[]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormDate name={"signedOnDate"} label={"Data podpisania"} control={control} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormDate name={"startDate"} label={"Data rozpoczęcia pracy"} control={control} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormDate name={"endDate"} label={"Data zwolnienia"} control={control} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormSelect name={"jobPositionId"} label={"Stanowisko"} control={control} options={selectJobPositions ?? []} />
                            </Grid>
                            <Grid item container spacing={2}>
                                <Grid item container xs={6} spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <FormInput name={"workingHours1"} label={""} type={"number"} control={control} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormInput name={"workingHours2"} label={""} type={"number"} control={control} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormInput
                                            name={"salaryWithTax"}
                                            label={"Wynagrodzenie brutto"}
                                            control={control}
                                            type={"number"}
                                            onChangeInput={(data) => handleOnChangeSalary(data, true)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormInput
                                            name={"salaryWithoutTax"}
                                            label={"Wynagrodzenie netto"}
                                            control={control}
                                            type={"number"}
                                            onChangeInput={(data) => handleOnChangeSalary(data, false)}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item container xs={6}>
                                    <Box sx={{
                                        ml: 8
                                    }}>
                                        <Grid item sm={12} >
                                            <FormCheckBox name={"fgsp"} label={"FGSP"} control={control} />
                                        </Grid>
                                        <Grid item sm={12}>
                                            <FormCheckBox name={"jobFound"} label={"Fundusz pracy"} control={control} />
                                        </Grid>
                                        <Grid item sm={12}>
                                            <FormCheckBox name={"voluntaryContribution"} label={"Skladka dobrowolna"} control={control} />
                                        </Grid>
                                        <Grid item sm={12}>
                                            <FormCheckBox name={"pensionFund"} label={"Fundusz emerytalny"} control={control} />
                                        </Grid>
                                        <Grid item sm={12}>
                                            <FormCheckBox name={"profitableFund"} label={"Fundusz rentowny"} control={control} />
                                        </Grid>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid item container spacing={2}>
                                <Grid item xs={12}>
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox onClick={handleLowestSalary} />} label="Najniższe wynagrodzenie" />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormSelect name={"insuranceCodeId"} label={"Kod tytułu ubezpieczenia"} control={control} options={[]} />
                                </Grid>
                                <Grid item container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormSelect name={"deductibleCostId"} label={"Koszty uzyskania przychodu"} control={control} options={[]} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormCheckBox name={"pitExemption"} label={"Zwolnienie podatkowe"} control={control} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container spacing={2} justifyContent={"flex-end"} >
                            <Grid item>
                                <Button type="button" color="error" variant="contained" onClick={handleOpenDialog}>Anuluj</Button>
                            </Grid>
                            <Grid item>
                                <Button type="submit" variant="contained">
                                    Dodaj
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Grid item container xs={12} md={6}>
                    <Grid item>
                        <Typography variant="h3">Kalkulacja kosztów pracownika</Typography>
                    </Grid>
                </Grid>
            </Grid >
            {
                openDialog ?
                    <CancelCreateContractDialog
                        isOpen={openDialog}
                        onClose={handleCloseDialog}
                        reset={reset}
                    /> : null
            }
        </>
    );
}

export default CreateContract;
