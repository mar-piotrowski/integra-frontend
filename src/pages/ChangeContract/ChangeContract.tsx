import { Grid, TextField, FormGroup, FormControlLabel, Checkbox, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FormCheckBox from "../../components/Form/FormCheckBox";
import FormDate from "../../components/Form/FormDate";
import FormInput from "../../components/Form/FormInput";
import FormSelect, { FormSelectOption } from "../../components/Form/FormSelect";
import CancelCreateContractDialog from "../../features/dialog/CancelCreateContractDialog";
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import useJobPositions from "../../hooks/jobPositions/useJobPositions";
import { ContractChange } from "../../api/types/documentTypes";
import { useNavigate, useParams } from "react-router-dom";
import useGetContract from "../../hooks/contract/useGetContract";
import Header from "../../components/CustomModalHeader";
import { z } from "Zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBoolean } from "../../hooks/useBoolean";
import ModalJobPosition from "../../features/modals/ModalJobPosition";
import useCreateContractChange from "../../hooks/contract/useCreateContractChange";

const defaultValues: ContractChange = {
    userId: 0,
    salaryWithTax: 0,
    salaryWithoutTax: 0,
    contractType: 0,
    workingHours1: 1,
    workingHours2: 1,
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
};

const validationSchema = z.object({
    salaryWithTax: z.number().min(1, "Wartość musi być większa od 0"),
    salaryWithoutTax: z.number().min(1, "Wartość musi być większa od 0"),
    contractType: z.number().min(1, "Wybierz rodzaj umowy"),
    signedOnDate: z.string({ required_error: "Podaj datę rozpoczęcia umowy" })
        .min(1, "Podaj datę rozpoczęcia umowy"),
    jobPosition: z.string().min(1, "Wybierz stanowisko"),
    workingHours1: z.number().min(1, "Nie podano wymiaru etatu"),
    workingHours2: z.number().min(1, "Nie podano wymiaru etatu"),
    deductibleCostId: z.number().min(1, "Wybierz koszt przychodu")
});

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

const ChangeContract = () => {
    const { contractId } = useParams();
    const navigate = useNavigate();
    const {
        value: jobPositionModal,
        setFalse: handleCloseJobPositionModal,
        setTrue: handleOpenJobPositionModal
    } = useBoolean(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const { control, reset, handleSubmit } = useForm<ContractChange>({
        defaultValues,
        resolver: zodResolver(validationSchema)
    });
    const { data: jobPositions } = useJobPositions();
    const { data: contract } = useGetContract(parseInt(contractId!));
    const { mutate: createContractChange, reset: createContractChangeReset, isSuccess: createContractChangeSuccess } = useCreateContractChange();

    useEffect(() => {
        reset(contract);
        if (createContractChangeSuccess) {
            createContractChangeReset()
            navigate(-1);
        }
    }, [createContractChangeSuccess, contract])

    const onSubmitHandler: SubmitHandler<ContractChange> = (data) => {
        createContractChange({
            contractId: contract.id,
            payload: {
                ...data,
                userId: contract.user.id
            }
        })
    };

    const handleOpenDialog = () => setOpenDialog(true);

    const handleCloseDialog = () => setOpenDialog(false);

    const selectJobPositions = jobPositions?.map((jobPosition: JobPosition) => ({
        label: jobPosition.title,
        value: jobPosition.title
    }))

    return (
        <>
            <Header title={"Dodawanie aneksu do umowy"} />
            <Grid container spacing={3}>
                <Grid item container xs={12} md={6}>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <Grid item container xs={12} spacing={2}>
                            <Grid item xs={12}>
                                <TextField label={"Pracownik"} value={`${contract?.user.firstname} ${contract?.user.lastname}`} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormDate name={"signedOnDate"} label={"Data podpisania"} control={control} />
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
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormInput
                                            name={"salaryWithoutTax"}
                                            label={"Wynagrodzenie netto"}
                                            control={control}
                                            type={"number"}
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
                                        <FormControlLabel control={<Checkbox />} label="Najniższe wynagrodzenie" />
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
                <Grid item container xs={12} md={6}>
                    <Grid item>
                        <Typography variant="h3">Kalkulacja kosztów pracownika</Typography>
                    </Grid>
                </Grid>
            </Grid >
            <CancelCreateContractDialog isOpen={openDialog} onClose={handleCloseDialog} reset={reset} />
            <ModalJobPosition isOpen={jobPositionModal} onClose={handleCloseJobPositionModal} />
        </>
    );
};

export default ChangeContract;