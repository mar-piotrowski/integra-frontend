import { Box, Button, Grid, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import LogoWithText from "../../../components/LogoWithText";
import useRegister from "../../../hooks/auth/useRegister";
import { z } from "Zod";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterVerificationStep from "./components/RegisterVerificationStep";
import RegisterBaseInfoStep from "./components/RegisterBaseInfoStep";

export interface RegisterForm {
    firstname: string;
    lastname: string;
    email: string;
    confirmationCode: string;
    password: string;
    confirmPassword: string;
}

const registerFormDefaultValues: RegisterForm = {
    firstname: "",
    lastname: "",
    email: "",
    confirmationCode: "",
    password: "",
    confirmPassword: ""
}

const validationSchema = z.object({
    firstname: z.string().min(1, "Podaj imię"),
    lastname: z.string().min(1, "Podaj nazwisko"),
    email: z.string().email("Podany błędy adres email"),
    password: z.string().min(1, "Podaj hasło"),
    confirmPassword: z.string().min(1, "Podaj hasło")
}).refine((value) => value.password === value.confirmPassword, {
    message: "Hasła nie są takie same",
    path: ["confirmPassword"]
});

const steps = ["Podstawowe informacje", "Weryfikacja"];

const Register = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const { mutate: registerMutation } = useRegister();
    const { control, handleSubmit } = useForm<RegisterForm>({
        defaultValues: registerFormDefaultValues,
        resolver: zodResolver(validationSchema)
    });

    const onSubmitHandler: SubmitHandler<RegisterForm> = (data) => registerMutation(data);

    const handleNext = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);

    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);


    return (
        <Grid
            container
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            spacing={1}
        >
            <Grid item xs={12}><LogoWithText /></Grid>
            <Grid item xs={12}> <Typography variant={"subtitle1"}>Utwórz konto i zarządzaj firmą!</Typography></Grid>
            <Grid item xs={12} sx={{ width: "350px" }}>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <Grid item xs={12} spacing={2}>
                        <Stepper activeStep={activeStep} sx={{ my: 4 }}>
                            {steps.map((label, index) => {
                                const stepProps: { completed?: boolean } = {};
                                const labelProps: {
                                    optional?: React.ReactNode;
                                } = {};
                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 2
                        }}>
                            {
                                activeStep == steps.length - 1
                                    ? (
                                        <>
                                            <RegisterVerificationStep control={control} />
                                            <Button
                                                type="button"
                                                variant={"contained"}
                                                sx={{ width: "100%" }}
                                                onClick={handleBack}
                                            >
                                                Powrót
                                            </Button>
                                            <Button
                                                type={"submit"}
                                                variant={"contained"}
                                                sx={{ width: "100%" }}
                                            >
                                                Zarejestruj
                                            </Button>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <RegisterBaseInfoStep control={control} />
                                            <Button
                                                type="button"
                                                variant={"contained"}
                                                sx={{ width: "100%" }}
                                                onClick={handleNext}
                                            >
                                                Dalej
                                            </Button>
                                        </>
                                    )
                            }
                        </Box>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    )
}

export default Register;