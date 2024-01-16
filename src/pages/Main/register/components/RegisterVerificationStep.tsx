import { Button, Grid } from "@mui/material";
import React from "react";
import { RegisterForm } from "../Register";
import { Control } from "react-hook-form";
import FormInput from "../../../../components/form/FormInput";

interface RegisterVerificationStepProps {
    control: Control<RegisterForm>;
}

const RegisterVerificationStep = ({ control }: RegisterVerificationStepProps) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormInput control={control} label={"Kod weryfikacyjny"} name={"confirmationCode"} />
            </Grid>
            <Grid item xs={12}>
                <FormInput control={control} label={"Hasło"} name={"password"} type={"password"} />
            </Grid>
            <Grid item xs={12}>
                <FormInput control={control} label={"Potwierdź hasło"} name={"confirmPassword"}
                    type={"password"} />
            </Grid>
        </Grid>
    );
};

export default RegisterVerificationStep;