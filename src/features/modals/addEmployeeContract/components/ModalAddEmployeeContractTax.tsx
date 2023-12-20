import { Grid } from "@mui/material";
import React from "react";
import FormSelect, { FormSelectOption } from "../../../../components/form/FormSelect";
import FormCheckBox from "../../../../components/form/FormCheckBox";
import { Control } from "react-hook-form";
import { Contract } from "../../../../api/types/documentTypes";

interface ModalAddEmployeeContractTax {
    control: Control<Contract>;
}

const salaryCosts: FormSelectOption[] = [
    {
        label: "Podstawowy",
        value: 3
    },
    {
        label: "Rozszerzony",
        value: 1
    }
];

const ModalAddEmployeeContractTax = ({ control }: ModalAddEmployeeContractTax) => {
    return (
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid item xs={12}>
                <FormSelect name={"deductibleCostId"} label={"Koszty uzyskania przychodu"} control={control} options={[]} />
            </Grid>
            <Grid item xs={12}>
                <FormCheckBox name={"pitExemption"} label={"Zwolnienie podatkowe"} control={control} />
            </Grid>
        </Grid>
    )
}

export default ModalAddEmployeeContractTax;