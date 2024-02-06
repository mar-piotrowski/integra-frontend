import { Grid } from "@mui/material"
import { Control } from "react-hook-form";
import React from "react";
import FormSelect, { FormSelectOption } from "../../../../components/Form/FormSelect";
import FormCheckBox from "../../../../components/Form/FormCheckBox";
import { Contract } from "../../../../api/types/documentTypes";

interface ModalAddEmployeeContractInsuranceProps {
    control: Control<Contract>;
}

const insuranceCodes: FormSelectOption[] = [
    {
        label: "01 10 pracownik podlegający ubezpieczeniu społecznemy i ubezpieczeniu zdrowotnemu",
        value: 0
    }
]

const ModalAddEmployeeContractInsurance = ({ control }: ModalAddEmployeeContractInsuranceProps) => {
    return (
        <Grid sx={{ flexGrow: 1 }} item container spacing={1}>
            <Grid item xs={12}>
                <FormSelect
                    name={"insuranceCodeId"}
                    label={"Kod tytułu ubezpieczenia"}
                    control={control}
                    options={insuranceCodes} />
            </Grid>
            <Grid item sm={12} md={3}>
                <FormCheckBox name={"fgsp"} label={"FGSP"} control={control} />
            </Grid>
            <Grid item sm={12} md={3}>
                <FormCheckBox name={"jobFound"} label={"Fundusz pracy"} control={control} />
            </Grid>
            <Grid item sm={12} md={6}>
                <FormCheckBox name={"voluntaryContribution"} label={"Skladka dobrowolna"} control={control} />
            </Grid>
            <Grid item sm={12} md={3}>
                <FormCheckBox name={"pensionFound"} label={"Fundusz emerytalny"} control={control} />
            </Grid>
            <Grid item sm={12} md={9}>
                <FormCheckBox name={"profitableFound"} label={"Fundusz rentowny"} control={control} />
            </Grid>
        </Grid>
    )
}

export default ModalAddEmployeeContractInsurance;