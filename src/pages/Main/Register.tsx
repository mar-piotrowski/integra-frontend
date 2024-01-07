import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import LogoWithText from "../../LogoWithText";
import FormInput from "../../components/form/FormInput";

import useRegister from "../../hooks/auth/useRegister";

export interface RegisterForm {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const registerFormDefaultValues: RegisterForm = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const Register = () => {
    const { mutate: registerMutation } = useRegister();
    const { control, reset, handleSubmit } = useForm<RegisterForm>({
        defaultValues: registerFormDefaultValues
    });

    const onSubmitHandler: SubmitHandler<RegisterForm> = (data) => {
        console.log(data);
        registerMutation(data);
    }

    return (
        <Grid
            container
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            gap={2}
            spacing={1}
        >
            <Grid item xs={12}><LogoWithText /></Grid>
            <Grid item xs={12}> <Typography variant={"subtitle1"}>Utwórz konto i zarządzaj firmą!</Typography></Grid>
            <Grid item xs={12} sx={{ width: "350px" }}>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <Grid item container xs={12} spacing={2}>
                        <Grid item xs={12}>
                            <FormInput control={control} label={"Imię"} name={"firstname"} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInput control={control} label={"Nazwisko"} name={"lastname"} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInput control={control} label={"Email"} name={"email"} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInput control={control} label={"Hasło"} name={"password"} type={"password"} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInput control={control} label={"Potwierdź hasło"} name={"confirmPassword"}
                                type={"password"} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type={"submit"} variant={"contained"} sx={{ width: "100%" }}>Zarejestruj</Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    )
}

export default Register;