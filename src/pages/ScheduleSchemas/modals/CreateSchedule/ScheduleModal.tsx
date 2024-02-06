import { Button, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { CreateSchedule, ScheduleDto } from "../../../../api/types/scheduleTypes";
import { SubmitHandler, useForm } from "react-hook-form";
import CustomModal from "../../../../components/CustomModal";
import FormInput from "../../../../components/Form/FormInput";
import ScheduleDayInput from "./ScheduleDayInput";
import Header from "../../../../components/CustomModalHeader";
import FormDate from "../../../../components/Form/FormDate";
import { z } from "Zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCreateSchedule from "../../../../hooks/schedule/useCreateSchedule";
import useEditSchedule from "../../../../hooks/schedule/useEditSchedule";

interface AddScheduleModalProps {
    isOpen: boolean;
    onClose: () => void;
    scheduleToEdit?: ScheduleDto | null
}

const validationSchema = z.object({
    name: z.string().min(1, "Pole wymagane"),
    startDate: z.string().min(1, "Pole wymagane"),
    endDate: z.string().nullable().optional(),
    days: z.array(z.object({
        day: z.number(),
        startDate: z.string().min(1, "Pole wymagane"),
        endDate: z.string().min(1, "Pole wymagane")
    }))
})

const defaultValues: CreateSchedule = {
    name: "",
    startDate: "",
    endDate: null,
    days: [
        {
            day: 1,
            startDate: "",
            endDate: ""
        },
        {
            day: 2,
            startDate: "",
            endDate: ""
        },
        {
            day: 3,
            startDate: "",
            endDate: ""
        },

        {
            day: 4,
            startDate: "",
            endDate: ""
        },
        {
            day: 5,
            startDate: "",
            endDate: ""
        },
        {
            day: 6,
            startDate: "",
            endDate: ""
        },
        {
            day: 7,
            startDate: "",
            endDate: ""
        }
    ]
}

const ScheduleModal = ({ isOpen, onClose, scheduleToEdit }: AddScheduleModalProps) => {
    const { mutate: createScheduleMutate, isSuccess: createScheduleSuccess, reset: createScheduleReset } = useCreateSchedule();
    const { mutate: updateScheduleMutate, isSuccess: updateScheduleSuccess, reset: updateScheduleReset } = useEditSchedule();
    const { control, handleSubmit, reset } = useForm<CreateSchedule>({
        defaultValues,
        resolver: zodResolver(validationSchema)
    })

    useEffect(() => {
        if (createScheduleSuccess || updateScheduleSuccess) {
            createScheduleReset();
            updateScheduleReset();
            handleOnClose();
        }

    }, [createScheduleSuccess, updateScheduleSuccess])

    useEffect(() => {
        if (scheduleToEdit != null)
            reset(scheduleToEdit);
    }, [open, scheduleToEdit])

    const onSubmitHandler: SubmitHandler<CreateSchedule> = (data) => {
        if (scheduleToEdit == null) {
            createScheduleMutate({
                ...data,
                endDate: data.endDate == "" ? null : data.endDate
            });
            return;
        }
        updateScheduleMutate({ id: scheduleToEdit.id, ...data });
    }

    const handleOnClose = () => {
        onClose();
        reset(defaultValues);
    }

    const renderedDays = defaultValues.days.map((day, index) =>
        <ScheduleDayInput key={day.day} control={control} day={day} index={index} />
    )

    return (
        <CustomModal isOpen={isOpen} onClose={handleOnClose}>
            <Header title="Tworzenie grafiku" />
            <form onSubmit={handleSubmit(onSubmitHandler)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormInput control={control} name={"name"} label={"Nazwa"} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormDate control={control} name={"startDate"} label={"Data rozpoczęcia"} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormDate control={control} name={"endDate"} label={"Data zakończenia"} />
                    </Grid>
                    <Grid item xs={12} overflow={"auto"} maxHeight={"500px"} mt={5}>
                        {renderedDays}
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                        <Button variant="contained" color="error" type="button" onClick={handleOnClose}>
                            Anuluj
                        </Button>
                        <Button variant="contained" type="submit">
                            {scheduleToEdit != null ? "Edytuj" : "Dodaj"}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </CustomModal>
    );
};

export default ScheduleModal;