import { Button, Grid } from "@mui/material";
import React from "react";
import { RegisterForm } from "../Register";
import { Control } from "react-hook-form";
import FormInput from "../../../../components/Form/FormInput";

interface RegisterBaseInfoStepProps {
    control: Control<RegisterForm>;
}

const RegisterBaseInfoStep = ({ control }: RegisterBaseInfoStepProps) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <FormInput control={control} label={"Imię"} name={"firstname"} />
            </Grid>
            <Grid item xs={12}>
                <FormInput control={control} label={"Nazwisko"} name={"lastname"} />
            </Grid>
            <Grid item xs={12}>
                <FormInput control={control} label={"Email"} name={"email"} />
            </Grid>
        </Grid>
    );
};

export default RegisterBaseInfoStep;