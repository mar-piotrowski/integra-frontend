import React, { useEffect, useState } from "react";
import CustomModal from "../../../components/CustomModal";
import useGetSchedules from "../../../hooks/schedule/useGetSchedules";
import Header from "../../../components/CustomModalHeader";
import FormSelect, { FormSelectOption } from "../../../components/form/FormSelect";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Grid, Typography } from "@mui/material";
import { ScheduleDto } from "../../../api/types/scheduleTypes";
import { dayNameMapper } from "../createSchedule/ScheduleDayInput";
import moment from "moment";
import { useParams } from "react-router-dom";
import useAddUserSchedule from "../../../hooks/employee/useAddUserSchedule";

interface AddUserScheduleModal {
    isOpen: boolean;
    onClose: () => void;
}

type AddUserScheduleForm = {
    scheduleSchemaId: number
}

const defaultValues: AddUserScheduleForm = {
    scheduleSchemaId: 0
};

const AddUserScheduleModal = ({ isOpen, onClose }: AddUserScheduleModal) => {
    const { userId } = useParams();
    const [selectOptions, setSelectOptions] = useState<FormSelectOption[]>([]);
    const [schedule, setSchedule] = useState<ScheduleDto | null>(null);
    const { data: schedules, isFetched } = useGetSchedules();
    const { control, handleSubmit, watch } = useForm<AddUserScheduleForm>({ defaultValues });
    const {
        mutate: addUserScheduleMutate,
        isSuccess: addUserScheduleSuccess,
        reset: addUserScheduleReset
    } = useAddUserSchedule();

    const watchScheduleId = watch("scheduleSchemaId");

    useEffect(() => {
        if (!addUserScheduleSuccess) return;
        handleOnClose();
    }, [addUserScheduleSuccess])

    useEffect(() => {
        if (watchScheduleId <= 0) return;
        setSchedule(schedules.find((schedule: ScheduleDto) => schedule.id == watchScheduleId));
    }, [watchScheduleId])

    useEffect(() => {
        if (!isFetched) return;
        setSelectOptions(schedules.map((schedule: ScheduleDto) => ({ label: schedule.name, value: schedule.id })));
    }, [isFetched])


    const handleOnClose = () => {
        onClose();
        addUserScheduleReset();
        setSchedule(null);
    }

    const handleOnSubmit: SubmitHandler<AddUserScheduleForm> = (data) => {
        addUserScheduleMutate({
            userId: parseInt(userId!),
            ...data
        })
    }

    const scheduleHours = schedule?.days.map(schedule => (
        <Grid key={schedule.day} item xs={12} display={"flex"} justifyContent={"space-between"}>
            <Typography variant="body1">{dayNameMapper(schedule.day)}</Typography>
            <Typography variant="body1">{moment(schedule.startDate).format("HH:mm")} - {moment(schedule.endDate).format("HH:mm")}</Typography>
        </Grid>
    ));

    return (
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <Header title="Dodawanie grafiku pracownika" />
            <form onSubmit={handleSubmit(handleOnSubmit)}>
                <Grid container spacing={2} maxWidth={"350px"}>
                    <Grid item xs={12}>
                        <FormSelect control={control} label="Grafik" name="scheduleSchemaId" options={selectOptions} />
                    </Grid>
                    <Grid container item xs={12} spacing={2}>
                        {
                            schedule != null
                                ? (
                                    <>
                                        <Grid item xs={12}>
                                            <Typography variant="h5">Zestawienie godzin</Typography>
                                        </Grid>
                                        <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>
                                            <Typography variant="body1">Suma godzin</Typography>
                                            <Typography variant="body1">{schedule.totalHours}</Typography>
                                        </Grid>
                                    </>
                                )
                                : null
                        }

                        {scheduleHours}
                    </Grid>
                    <Grid item container spacing={2} xs={12} display={"flex"} justifyContent={"flex-end"}>
                        <Grid item>
                            <Button variant="contained" color="error" onClick={onClose}>Wyjdź</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" type="submit">Dodaj</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </CustomModal >
    );
};

export default AddUserScheduleModal;