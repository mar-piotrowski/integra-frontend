import React, {useState} from "react";
import {Box, Button, Grid, Typography} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import FormInput from "../../components/Form/FormInput";
import z from "Zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate} from "react-router-dom";

interface ContactForm {
    nip: string;
    name: string;
    email: string;
}

const defaultValues: ContactForm = {
    nip: "",
    name: "",
    email: ""
}

const validation = z.object({
    nip: z.string().min(10, "Podno błędny nip"),
    name: z.string().min(1, "Nazwa firmy jest wymagana"),
    email: z.string().email()
});

const Contact = () => {
    const {control, handleSubmit} = useForm<ContactForm>({
        defaultValues,
        resolver: zodResolver(validation)
    });
    const [send, setSend] = useState(false);
    const navigate = useNavigate();

    const onSubmitHandler: SubmitHandler<ContactForm> = () => {
        setSend(true);
    }

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>

            {
                !send
                    ? <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <Grid container spacing={2} maxWidth={"400px"}>
                            <Grid item xs={12} textAlign={"center"}>
                                <Typography variant={"h3"}>Skontantuj się z nami!</Typography>
                            </Grid>
                            <Grid item xs={12} textAlign={"center"}>
                                <Typography variant={"body1"}>Nasz konsultant skontaktuje się z Państwem w ciągu
                                    24h</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <FormInput name={"nip"} label={"Nip"} control={control}/>
                            </Grid>
                            <Grid item xs={12}>
                                <FormInput name={"name"} label={"Nazwa firmy"} control={control}/>
                            </Grid>
                            <Grid item xs={12}>
                                <FormInput name={"email"} label={"email"} control={control}/>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{
                                        width: "100%"
                                    }}
                                >
                                    Wyślij zgłoszenie
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                    : <Box textAlign={"center"}>
                        <Typography variant={"h2"} mb={2}>Dziękujemy za wysłanie zgłoszenia</Typography>
                        <Button onClick={() => navigate("/")}>Strona główna</Button>
                    </Box>
            }
        </Box>
    )
}

export default Contact;