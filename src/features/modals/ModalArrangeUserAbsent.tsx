import {Button, Grid, TextField, Typography} from "@mui/material";
import CustomModal from "../../components/CustomModal";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import FormSelect, {FormSelectOption} from "../../components/form/FormSelect";
import FormDate from "../../components/form/FormDate";

interface ModalArrangeUserAbsentProps {
    open: boolean;
    onClose: () => void;
}

interface UserAbsentReasonForm {
    absentType: string;
    startDate: string;
    endDate: string;
    accepted: boolean;
    description: string;
}

const userAbsentReasonDefaultValues: UserAbsentReasonForm = {
    absentType: "",
    startDate: "",
    endDate:"",
    accepted: false,
    description: ""
}

const absentTypes: FormSelectOption[] = [
    {
        label:"Zwolnienie chorobowe",
        value: "1"
    },
    {
        label:"Urlop wypoczynkowy",
        value: "2"
    },
]

const ModalArrangeUserAbsent = ({open, onClose}: ModalArrangeUserAbsentProps) => {
    const {control, handleSubmit} = useForm<UserAbsentReasonForm>({
        defaultValues: userAbsentReasonDefaultValues,
    });

    const onSubmitHandler: SubmitHandler<UserAbsentReasonForm> = (data) => {
        console.log(data);
    };

    return (
        <CustomModal open={open} onClose={onClose}>
            <Grid container spacing={2}>
                <Grid item>
                    <Typography variant="h3">Dodawanie nieobecności pracownika</Typography>
                </Grid>
                <Grid item>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <Grid sx={{flexGrow: 1}} item container spacing={2}>
                            <Grid item xs={12}>
                                <FormSelect name="absentType" label="Typ urlopu" control={control}
                                            options={absentTypes}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormDate name={"startDate"} label={"Rozpoczęcie"} control={control}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormDate name={"startDate"} label={"Rozpoczęcie"} control={control}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField value={20} label="Ilość godzin" sx={{width: "100%"}}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField value={20} label="Ilość dni" sx={{width: "100%"}}/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Opis"
                                    multiline
                                    rows={4}
                                    sx={{width: "100%"}}
                                />
                            </Grid>
                        </Grid>
                    </form>
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
                        Dodaj
                    </Button>
                </Grid>
            </Grid>
        </CustomModal>
    )
}

export default ModalArrangeUserAbsent;