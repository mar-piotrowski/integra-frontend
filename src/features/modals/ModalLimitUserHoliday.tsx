import CustomModal from "../../components/CustomModal";
import React, {useEffect} from "react";
import {Button, Grid, TextField, Typography} from "@mui/material";
import {SubmitHandler, useForm} from "react-hook-form";
import {CreateHolidayLimit} from "../../api/types/documentTypes";
import FormDate from "../../components/form/FormDate";
import useCreateHolidayLimit from "../../hooks/holidayLimits/useCreateHolidayLimit";

interface ModalLimitUserHolidayProps {
    open: boolean;
    onClose: () => void;
}

const defaultValues: CreateHolidayLimit = {
    userId: 2,
    current: "",
    startDate: "",
    endDate: "",
    description: ""
}

const ModalLimitUserHoliday = ({open, onClose}: ModalLimitUserHolidayProps) => {
    const {mutate: createHolidayLimitMutation, isSuccess} = useCreateHolidayLimit();
    const {control, handleSubmit, setValue} = useForm<CreateHolidayLimit>({defaultValues});

    useEffect(() => {
        setValue("current", new Date(new Date().getFullYear(), 1, 1).toISOString());
        setValue("startDate", new Date(new Date().getFullYear(), 1, 1).toISOString());
        setValue("endDate", new Date(new Date().getFullYear(), 11, 32).toISOString());
    }, [open])

    useEffect(() => {
        onClose();
    }, [isSuccess]);

    const onSubmitHandler: SubmitHandler<CreateHolidayLimit> = (data) => {
        createHolidayLimitMutation(data);
    };

    return (
        <CustomModal open={open} onClose={onClose}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h3">Dodawanie limity urlopowego</Typography>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <Grid sx={{flexGrow: 1}} item container spacing={2}>
                            <Grid item xs={12}>
                                <FormDate
                                    disabled
                                    name="current"
                                    label="Aktualny"
                                    control={control}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormDate
                                    name="startDate"
                                    label="Licząc od"
                                    disabled
                                    control={control}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormDate
                                    name="endDate"
                                    label="Limit za rok"
                                    disabled
                                    control={control}
                                />
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
                    </form>
                </Grid>
            </Grid>
        </CustomModal>
    )
}

export default ModalLimitUserHoliday;
