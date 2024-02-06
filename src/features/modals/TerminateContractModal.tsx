import React, { useEffect } from "react";
import CustomModal from "../../components/CustomModal";
import { Button, Grid, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { ContractTerminate } from "../../api/types/documentTypes";
import FormSelect, { FormSelectOption } from "../../components/Form/FormSelect";
import FormDate from "../../components/Form/FormDate";
import useTerminateContract from "../../hooks/contract/useTerminateContract";
import { ContractType } from "../../constants/enums";
import { z } from "Zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "../../components/CustomModalHeader";

interface TerminateContractModalProps {
    isOpen: boolean;
    onClose: () => void;
    contractId: number;
}

const defaultValues: ContractTerminate = {
    contractId: 0,
    terminateType: ContractType.ByMutualAgreement,
    terminateDate: new Date()
}


const options: FormSelectOption[] = [
    {
        label: "Porozumienie stron",
        value: ContractType.ByMutualAgreement
    },
    {
        label: "Przez pracodawcę",
        value: ContractType.ByTheEmployer
    },
    {
        label: "Przez pracownika",
        value: ContractType.ByTheEmployee
    },
    {
        label: "Przez pracodawcę bez zachowaniu okresu wypowiedzenia",
        value: ContractType.ByTheEmployerWithoutNoticePeriod
    },
    {
        label: "Przez pracodawcę z zachowaniem okresu wypowiedzenia",
        value: ContractType.ByTheEmployerWithNoticePeriod
    },
];

const TerminateContractModal = ({ isOpen, onClose, contractId }: TerminateContractModalProps) => {
    const { handleSubmit, control } = useForm<ContractTerminate>({
        defaultValues
    });
    const { mutate: terminateContractMutate, isSuccess } = useTerminateContract();

    useEffect(() => {
        if (isSuccess)
            onClose();
    }, [isSuccess])

    const onSubmitHandler: SubmitHandler<ContractTerminate> = (data) => {
        data.contractId = contractId;
        terminateContractMutate(data);
    }

    return (
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Header title="Rozwiązywanie umowy" />
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <Grid item container spacing={2}>
                            <Grid item xs={12}>
                                <FormSelect
                                    name="terminateType"
                                    label="Typ wypowiedzenia umowy"
                                    control={control}
                                    options={options}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormDate
                                    name="terminateDate"
                                    label="Data wypowiedzenia"
                                    control={control}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    gap: "10px",
                                }}
                            >
                                <Button variant="contained" color="error" onClick={onClose}>
                                    Anuluj
                                </Button>
                                <Button variant="contained" type="submit">
                                    Rozwiąż
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </CustomModal>
    );
};

export default TerminateContractModal;