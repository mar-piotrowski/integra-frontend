import { Grid, TextField, FormGroup, FormControlLabel, Checkbox, Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import FormCheckBox from "../../components/Form/FormCheckBox";
import FormDate from "../../components/Form/FormDate";
import FormInput from "../../components/Form/FormInput";
import FormSelect, { FormSelectOption } from "../../components/Form/FormSelect";
import useJobPositions from "../../hooks/jobPositions/useJobPositions";
import useCreateContract from "../../hooks/contract/useCreateContract";
import { Contract } from "../../api/types/documentTypes";
import { SubmitHandler, useForm } from "react-hook-form";
import CancelCreateContractDialog from "../../features/dialog/CancelCreateContractDialog";
import EmployeeCostCalculator from "../../features/employee/EmployeeCostCalculator";
import Header from "../../components/CustomModalHeader";
import { z } from "Zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBoolean } from "../../hooks/useBoolean";
import ModalJobPosition from "../../features/modals/ModalJobPosition";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../../hooks/employee/useUser";

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
    workingHours1: 1,
    workingHours2: 1,
    startDate: "",
    endDate: null,
    signedOnDate: "",
    jobFound: true,
    pensionFund: false,
    voluntaryContribution: false,
    profitableFund: false,
    fgsp: false,
    pitExemption: false,
    taxRelief: false,
    jobPosition: "",
    insuranceCodeId: 0,
    deductibleCostId: 0,
}

const contractTypes: FormSelectOption[] = [
    {
        label: "Umowa o pracę",
        value: 1
    },
    {
        label: "Umowa zlecenie",
        value: 2
    },
    {
        label: "Umowa o dzieło",
        value: 3
    }
];

const deductibleCosts: FormSelectOption[] = [
    {
        label: "Podstawowy",
        value: 1
    },
    {
        label: "Rozszerzony",
        value: 2
    }
]

const validationSchema = z.object({
    salaryWithTax: z.number().min(1, "Wartość musi być większa od 0"),
    salaryWithoutTax: z.number().min(1, "Wartość musi być większa od 0"),
    contractType: z.number().min(1, "Wybierz rodzaj umowy"),
    startDate: z.string({ required_error: "Podaj datę rozpoczęcia umowy" })
        .min(1, "Podaj datę rozpoczęcia umowy"),
    signedOnDate: z.string({ required_error: "Podaj datę podpisania umowy" })
        .min(1, "Podaj datę podpisania umowy"),
    jobPosition: z.string().min(1, "Wybierz stanowisko"),
    workingHours1: z.number().min(1, "Nie podano wymiaru etatu"),
    workingHours2: z.number().min(1, "Nie podano wymiaru etatu"),
    deductibleCostId: z.number().min(1, "Wybierz koszt przychodu")
});

const CreateContract = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [lowestSalary, setLowestSalary] = useState<boolean>(false);
    const {
        value: jobPositionModal,
        setFalse: handleCloseJobPositionModal,
        setTrue: handleOpenJobPositionModal
    } = useBoolean(false);
    const [salary, setSalary] = useState<Salary>(defaultValuesSalary);
    const {data: user} = useUser(parseInt(userId!));
    const { data: jobPositions } = useJobPositions();
    const { mutate: createContractMutation, isSuccess: createContractSuccess } = useCreateContract();
    const { control, reset, handleSubmit, setValue: setValueForm } = useForm<Contract>({
        defaultValues,
        resolver: zodResolver(validationSchema)
    });

    useEffect(() => {
        if (createContractSuccess)
            navigate(-1);
    }, [createContractSuccess]);

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
        data.userId = parseInt(userId!);
        createContractMutation(data);
    };

    const handleOpenDialog = () => setOpenDialog(true);

    const handleCloseDialog = () => setOpenDialog(false);

    const handleOnChangeSalary = (data: string | number, withTax: boolean) => {
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
        setSalary(() => {
            if (withTax)
                return {
                    withoutTax: parseFloat((parsedValue * 0.77).toFixed(2)),
                    withTax: parsedValue
                }
            return {
                withTax: parseFloat((parsedValue / 1.23).toFixed(2)),
                withoutTax: parsedValue
            }
        })

    }

    const selectJobPositions = jobPositions?.map((jobPosition: JobPosition) => ({
        label: jobPosition.title,
        value: jobPosition.title
    }))

    return (
        <>
            <Header title="Tworzenie umowy" />
            <Grid container spacing={8}>
                <Grid item container xs={12} md={6}>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <Grid item container xs={12} spacing={2}>
                            <Grid item xs={12}>
                                <TextField label={"Pracownik"} value={`${user?.firstname} ${user?.lastname}`} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormSelect
                                    name={"contractType"}
                                    label={"Rodzaj umowy"}
                                    control={control}
                                    options={contractTypes}
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
                                <FormSelect
                                    name={"jobPosition"}
                                    label={"Stanowisko"}
                                    control={control}
                                    options={selectJobPositions ?? []}
                                    buttons={[{ label: "Dodaj stanowisko", onClick: handleOpenJobPositionModal }]}
                                />
                            </Grid>
                            <Grid item container spacing={2}>
                                <Grid item container xs={6} spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <FormInput name={"workingHours1"} label={"Wymaiar etatu"} type={"number"} control={control} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <FormInput name={"workingHours2"} label={""} type={"number"} control={control} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormInput
                                            name={"salaryWithTax"}
                                            label={"Wynagrodzenie brutto"}
                                            control={control}
                                            onChangeInput={(data) => handleOnChangeSalary(data, true)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormInput
                                            name={"salaryWithoutTax"}
                                            label={"Wynagrodzenie netto"}
                                            control={control}
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
                                <Grid item container spacing={2}>
                                    <Grid item xs={12}>
                                        <FormSelect name={"deductibleCostId"} label={"Koszty uzyskania przychodu"} control={control} options={deductibleCosts} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormCheckBox name={"pitExemption"} label={"Zwolnienie podatkowe"} control={control} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item container spacing={2} justifyContent={"flex-end"} >
                            <Grid item>
                                <Button disableElevation type="button" color="error" variant="contained" onClick={handleOpenDialog}>Anuluj</Button>
                            </Grid>
                            <Grid item>
                                <Button disableElevation type="submit" variant="contained">
                                    Dodaj
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid >
            <CancelCreateContractDialog isOpen={openDialog} onClose={handleCloseDialog} reset={reset} />
            <ModalJobPosition isOpen={jobPositionModal} onClose={handleCloseJobPositionModal} />
        </>
    );
}

export default CreateContract;
