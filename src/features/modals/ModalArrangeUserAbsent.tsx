import { Button, Grid, TextField, Typography } from "@mui/material";
import CustomModal from "../../components/CustomModal";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import FormSelect, { FormSelectOption } from "../../components/form/FormSelect";
import FormDate from "../../components/form/FormDate";
import FormInput from "../../components/form/FormInput";
import { z } from "Zod";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import useCreateAbsence from "../../hooks/absence/useCreateAbsence";
import { useParams } from "react-router-dom";
import FormCheckBox from "../../components/form/FormCheckBox";
import { AbsenceType } from "../../constants/enums";
import { UpdateAbsence } from "../../api/types/absenceTypes";
import useUpdateAbsence from "../../hooks/absence/useUpdateAbsence";

interface ModalArrangeUserAbsentProps {
    open: boolean;
    onClose: () => void;
    absence?: UpdateAbsence | null;
}

interface CalculateArrange {
    days: number;
    hours: number;
}

interface UserAbsentReasonForm {
    type: string;
    startDate: string;
    endDate: string;
    diseaseCode: string | null;
    series: string | null;
    number: string | null;
    description: string | null;
    accepted: boolean;
}

const defaultValues: UserAbsentReasonForm = {
    type: "",
    startDate: "",
    endDate: "",
    description: "",
    accepted: false,
    diseaseCode: null,
    series: null,
    number: null
}

const validationSchema = z.object({
    startDate: z.string().min(1, "Pole wymagane"),
    endDate: z.string().min(1, "Pole wymagane"),
    type: z.string().min(1, "Pole wymagane"),
    accepted: z.boolean(),
    diseaseCode: z.string().nullable(),
    description: z.string().nullable(),
    series: z.string().nullable(),
    number: z.string().nullable()
});

const absentTypes: FormSelectOption[] = [
    {
        label: "Urlop wypoczynkowy",
        value: "1"
    },
    {
        label: "Zwolnienie chorobowe",
        value: "2"
    },
]

const ModalArrangeUserAbsent = ({ open, onClose, absence }: ModalArrangeUserAbsentProps) => {
    const { mutate: createAbsence, isSuccess: createAbsenceSuccess } = useCreateAbsence();
    const { mutate: updateAbsence, isSuccess: updateAbsenceSuccess } = useUpdateAbsence();
    const { userId } = useParams();
    const [calculateArrange, setCalculateArrange] = useState<CalculateArrange>({ days: 0, hours: 0 });
    const { control, handleSubmit, reset } = useForm<UserAbsentReasonForm>({ defaultValues });

    const absenceTypeWatch = useWatch({ name: "type", control });
    const startDateWatch = useWatch({ name: "startDate", control });
    const endDateWatch = useWatch({ name: "endDate", control });

    useEffect(() => {
        if (absence == null) return;
        reset({ ...absence, type: absence.type.toString() });
    }, [absence]);

    useEffect(() => {
        if (!updateAbsenceSuccess) return;
        handleOnClose();
    }, [updateAbsenceSuccess])

    useEffect(() => {
        if (!createAbsenceSuccess) return;
        handleOnClose();
    }, [createAbsenceSuccess])

    useEffect(() => {
        if (startDateWatch == "" || endDateWatch == "") return;
        var startDate = moment(startDateWatch);
        var endDate = moment(endDateWatch);
        if (startDate > endDate) {
            setCalculateArrange({ days: 0, hours: 0 });
            return;
        }
        setCalculateArrange({
            days: endDate.diff(startDate) / 86400000,
            hours: (endDate.valueOf() - startDate.valueOf()) / 1000 / 60 / 60
        })
    }, [startDateWatch, endDateWatch])


    const onSubmitHandler: SubmitHandler<UserAbsentReasonForm> = (data) => {
        if (absence != null) {
            updateAbsence({
                ...data,
                absenceId: absence.absenceId,
                type: absence.type,
                userId: absence.userId
            });
            return;
        }
        createAbsence({
            ...data,
            userId: parseInt(userId!),
            type: (parseInt(data.type) as AbsenceType)
        });
    };

    const handleOnClose = () => {
        onClose();
        setCalculateArrange({ days: 0, hours: 0 });
        reset(defaultValues);
    }

    return (
        <CustomModal isOpen={open} onClose={handleOnClose}>
            <Grid container spacing={2}>
                <Grid item>
                    <Typography variant="h3">Dodawanie nieobecności pracownika</Typography>
                </Grid>
                <Grid item>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <Grid sx={{ flexGrow: 1 }} item container spacing={2}>
                            <Grid item xs={12}>
                                <FormSelect name="type" label="Typ urlopu" control={control} options={absentTypes} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormDate name={"startDate"} label={"Rozpoczęcie"} control={control} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormDate name={"endDate"} label={"Zakończenie"} control={control} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField value={calculateArrange.hours} label="Ilość godzin" sx={{ width: "100%" }} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField value={calculateArrange.days} label="Ilość dni" sx={{ width: "100%" }} />
                            </Grid>
                            <Grid item>
                                <FormCheckBox name="accepted" label="Zaakceptuj nieobecność" control={control} />
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    parseInt(absenceTypeWatch) === 2
                                        ? <FormInput name="diseaseCode" label="Kod choroby" control={control} />
                                        : null
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Opis"
                                    multiline
                                    rows={4}
                                    sx={{ width: "100%" }}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: "10px", }} >
                                <Button variant="contained" color="error" onClick={handleOnClose}>
                                    Anuluj
                                </Button>
                                <Button variant="contained" type="submit">
                                    {absence != null ? "Edytuj" : "Dodaj"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </CustomModal>
    )
}

export default ModalArrangeUserAbsent;