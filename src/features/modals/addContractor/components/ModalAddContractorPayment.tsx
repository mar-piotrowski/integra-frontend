import { Grid } from "@mui/material";
import { Control } from "react-hook-form";
import FormInput from "../../../../components/form/FormInput";
import React from "react";
import { CreateContractorRequest } from "../../../../api/types/contractorTypes";

interface ModalAddContractorPaymentProps {
    control: Control<CreateContractorRequest>;
}

const ModalAddContractorPayment = ({ control }: ModalAddContractorPaymentProps) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormInput name="bankAccount.name" label="Nazwa banku" control={control} />
            </Grid>
            <Grid item xs={12}>
                <FormInput name="bankAccount.number" label="Numer rachunku" control={control} />
            </Grid>
        </Grid>
    );
};

export default ModalAddContractorPayment;
