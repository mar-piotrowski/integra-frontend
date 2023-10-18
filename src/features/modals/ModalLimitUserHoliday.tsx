import CustomModal from "../../components/CustomModal";
import React from "react";
import {Button, Grid, TextField, Typography} from "@mui/material";
import FormSelect, {FormSelectOption} from "../../components/form/FormSelect";
import {SubmitHandler, useForm} from "react-hook-form";

interface ModalLimitUserHolidayProps {
    open: boolean;
    onClose: () => void;
}

interface UserLimitHolidayForm {
    year: number;
    holidayLimitType: string;
    description: string;
}

const userLimitHolidayFormDefaultValues: UserLimitHolidayForm = {
    year: 0,
    holidayLimitType: "",
    description: ""
}

const holidayTypes: FormSelectOption[] = [
    {
        label: "Urlop wypoczynkowy",
        value: "1"
    },
    {
        label: "Urlop okolicznościowy",
        value: "2"
    }
]

const yearLimit: FormSelectOption[] = [
    {
        label: "2020",
        value: "2020"
    },
    {
        label: "2021",
        value: "2021"
    },
    {
        label: "2023",
        value: "2023"
    }
]

const ModalLimitUserHoliday = ({open, onClose}: ModalLimitUserHolidayProps) => {
    const {control, handleSubmit} = useForm<UserLimitHolidayForm>({
        defaultValues: userLimitHolidayFormDefaultValues,
    });

    const onSubmitHandler: SubmitHandler<UserLimitHolidayForm> = (data) => {
        console.log(data);
    };

    return (
        <CustomModal open={open} onClose={onClose}>
            <Grid container spacing={2}>
                <Grid item>
                    <Typography variant="h3">Dodawanie limity urlopowego</Typography>
                </Grid>
                <Grid item>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>

                        <Grid sx={{flexGrow: 1}} item container spacing={2}>
                            <Grid item xs={12}>
                                <FormSelect name="year" label="Limit za rok" control={control}
                                            options={yearLimit}/>
                            </Grid>
                            <Grid item xs={12}>
                                <FormSelect name="holidayLimitType" label="Typ urlopu" control={control}
                                            options={holidayTypes}/>
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

export default ModalLimitUserHoliday;
