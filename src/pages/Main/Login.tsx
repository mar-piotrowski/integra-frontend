import React, { useEffect } from "react";
import { Button, Checkbox, FormControlLabel, FormGroup, Grid, Typography } from "@mui/material";
import LogoWithText from "../../components/LogoWithText";
import { SubmitHandler, useForm } from "react-hook-form";
import FormInput from "../../components/Form/FormInput";
import useLogin from "../../hooks/auth/useLogin";
import useAuth from "../../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { z } from "Zod";
import { zodResolver } from "@hookform/resolvers/zod";

export interface LoginForm {
    email: string;
    password: string;
}

const loginFormDefaultValues = {
    email: "",
    password: ""
}

type LoginType = "employee" | "management";

interface LoginProps {
    type: LoginType;
}

const validationSchema = z.object({
    email: z.string().email("Podano błędny adres email"),
    password: z.string().min(1, "Podaj hasło")
})

const Login = ({ type }: LoginProps) => {
    const { mutate: loginMutation } = useLogin();
    const { auth, persist, setPersist } = useAuth();
    const navigate = useNavigate();
    const { control, handleSubmit } = useForm<LoginForm>({
        defaultValues: loginFormDefaultValues,
        resolver: zodResolver(validationSchema)
    });

    const onSubmitHandler: SubmitHandler<LoginForm> = (data) => loginMutation(data);

    useEffect(() => {
        if (auth?.accessToken == null) return;
        if (type == "employee") {
            navigate("/employee-panel")
            return;
        }
        if (type == "management")
            navigate("/management-panel");
    }, [auth?.accessToken, navigate]);

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
            <Grid item xs={12}>
                <Typography
                    variant={"subtitle1"}>
                    Logowanie
                    {type == "employee" ? " do panelu pracownika" : " do panelu zarządzania"}
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{ width: "350px" }}>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <Grid item container xs={12} spacing={2}>
                        <Grid item xs={12}>
                            <FormInput control={control} label={"Email"} name={"email"} />
                        </Grid>
                        <Grid item xs={12}>
                            <FormInput control={control} label={"Hasło"} name={"password"} type={"password"} />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type={"submit"} variant={"contained"} sx={{ width: "100%" }}>Zaloguj</Button>
                        </Grid>
                    </Grid>
                </form>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onClick={() => setPersist(!persist)}
                                checked={persist}
                            />
                        }
                        label="Zapamiętaj mnie" />
                </FormGroup>
            </Grid>
        </Grid>
    )
}

export default Login;