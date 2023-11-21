import {ModalBaseProps} from "../../interfaces/modal";
import {DateSelectArg, EventClickArg} from "@fullcalendar/core";
import {Button, Grid, Typography} from "@mui/material";
import React, {RefObject, useEffect} from "react";
import CustomModal from "../../components/CustomModal";
import {SubmitHandler, useForm} from "react-hook-form";
import FormInput from "../../components/form/FormInput";
import FormDateTime from "../../components/form/FormDateTime";
import FullCalendar from "@fullcalendar/react";
import FormCheckBox from "../../components/form/FormCheckBox";
import {successToast} from "../../utils/toastUtil";

interface CalendarAddEventModalProps extends ModalBaseProps {
    calendarRef: RefObject<FullCalendar>;
    eventInfo: DateSelectArg | null;
    eventToEdit: EventClickArg | null;
}

interface NewCalendarEvent {
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
}

const newCalendarEventDefaultValues: NewCalendarEvent = {
    title: "",
    start: new Date(),
    end: new Date(),
    allDay: false
}

const CalendarAddEventModal = ({open, onClose, eventInfo, calendarRef, eventToEdit}: CalendarAddEventModalProps) => {
    const {control, handleSubmit, reset} = useForm<NewCalendarEvent>({
        defaultValues: newCalendarEventDefaultValues
    })

    useEffect(() => {
        setDayEventTime();
        setEventToEdit();
    }, [open]);

    const setEventToEdit = () => {
        if (eventToEdit != null)
            reset({
                title: eventToEdit.event.title,
                start: eventToEdit.event.start!,
                end: eventToEdit.event.end == null ? eventToEdit.event.start! : eventToEdit.event.end!,
                allDay: eventToEdit.event.allDay
            })
    }

    const setDayEventTime = () => {
        if (eventInfo != null) {
            reset({
                title: "",
                start: new Date(eventInfo.start),
                end: new Date(eventInfo.start),
                allDay: false
            })
        }
    }

    const onSubmitHandler: SubmitHandler<NewCalendarEvent> = (data) => {
        if (eventInfo == null && !addNewEvent(data))
            return;
        if (eventInfo != null && !addDayEvent(data))
            return;
        if (eventToEdit != null)
            editEvent(data);
        successToast(`Wydarzenie ${data.title} zostało dodane!`)
        onClose();
        reset();
    }

    const onCloseModal = () => {
        onClose();
        reset(newCalendarEventDefaultValues);
    }

    const editEvent = (data: NewCalendarEvent) => {
    }

    const addDayEvent = (data: NewCalendarEvent) => {
        if (eventInfo == null)
            return false;
        const calendarApi = eventInfo.view.calendar;
        calendarApi.unselect();
        calendarApi.addEvent({
            id: "1",
            title: data.title,
            start: data.start,
            end: data.end,
            allDay: data.allDay
        })
        return true;
    }

    const addNewEvent = (data: NewCalendarEvent) => {
        const calendarApi = calendarRef.current!.getApi();
        calendarApi.unselect()
        calendarApi.addEvent({
            id: "1",
            title: data.title,
            start: data.start,
            end: data.end,
            allDay: data.allDay
        })
        return true;
    }

    const removeEvent = () => {
        eventToEdit?.event.remove();
        onCloseModal();
        successToast(`Wydarzenie ${eventToEdit?.event.title} zostało usunięte`);
    }

    return (
        <CustomModal
            open={open}
            onClose={onCloseModal}
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant={"h3"}>Dodawanie nowego eventu</Typography>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit(onSubmitHandler)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <FormInput name={"title"} label={"Nazwa wydarzenia"} control={control}/>
                            </Grid>
                            <Grid item xs={12}>
                                <FormDateTime
                                    name={"start"}
                                    label={"Czas rozpoczęcia"}
                                    control={control}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormDateTime
                                    name={"end"}
                                    label={"Czas zakończenia"}
                                    control={control}
                                />
                            </Grid>
                            <Grid item>
                                <FormCheckBox name={"allDay"} label={"Cały dzień"} control={control}/>
                            </Grid>
                            <Grid
                                item
                                container
                                justifyContent={"flex-end"}
                                spacing={1}
                                xs={12}
                            >
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={onCloseModal}
                                    >
                                        Anuluj
                                    </Button>
                                </Grid>
                                {
                                    eventToEdit != null
                                        ? <Grid item>
                                            <Button
                                                variant="contained"
                                                color={"warning"}
                                                onClick={removeEvent}
                                            >
                                                Usuń
                                            </Button>
                                        </Grid>
                                        : null
                                }
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                    >
                                        {eventToEdit != null ? "Edytuj" : "Dodaj"}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>

            </Grid>
        </CustomModal>
    )
}

export default CalendarAddEventModal;