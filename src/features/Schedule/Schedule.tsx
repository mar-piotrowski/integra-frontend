import {EventContentArg} from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import {Grid} from "@mui/material";
import {Box, useTheme} from "@mui/system";
import React, {createRef, useEffect, useState} from "react";
import {ScheduleDay} from "../../api/types/scheduleTypes";
import {useBoolean} from "../../hooks/useBoolean";
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import useGetUserSchedules from "../../hooks/employee/useGetUserSchedules";
import AddUserScheduleModal from "../modals/addUserSchedule/AddUserScheduleModal";
import useDeleteUserSchedule from "../../hooks/employee/useDeleteSchedule";

interface ScheduleProps {
    userId: number;
    manage: boolean;
}

interface ScheduleCurrentDate {
    year: number;
    month: number;
}

const Schedule = ({userId, manage}: ScheduleProps) => {
    const theme = useTheme();
    const [date, setDate] = useState<ScheduleCurrentDate>({year: 0, month: 0});
    const {value: fetch, setTrue: fetchStart} = useBoolean(false);
    const {value: addScheduleModal, setTrue: openAddScheduleModal, setFalse: closeAddScheduleModal} = useBoolean(false);
    const [scheduleId, setScheduleId] = useState<number>(0);
    const {data: schedule, isSuccess: scheduleSuccess, refetch: scheduleRefetch} = useGetUserSchedules(
        userId,
        date.year,
        date.month,
        false,
        fetch
    );
    const {mutate: deleteSchedule, isSuccess: deleteScheduleSuccess, reset: deleteReset} = useDeleteUserSchedule();

    const calendarRef = createRef<FullCalendar>();

    useEffect(() => {
        handleOnSetScheduleDate();
        fetchStart();
    }, [])

    useEffect(() => {
        if (date.year == 0) return;
        scheduleRefetch();
    }, [date])

    useEffect(() => {
        if (deleteScheduleSuccess) {
            handleOnClearCalendar();
            deleteReset();
            scheduleRefetch();
        }
    }, [deleteScheduleSuccess])

    useEffect(() => {
        if (!scheduleSuccess && schedule == undefined) return;
        handleOnClearCalendar();
        schedule.days.forEach((day: ScheduleDay) => addScheduleEvents(new Date(day.startDate), new Date(day.endDate)))
        setScheduleId(schedule.days[0].schemaId);
    }, [scheduleSuccess, calendarRef])

    const handleOnSetScheduleDate = () => {
        const calendarDate = calendarRef.current?.getApi().getDate()
        if (calendarDate == undefined) return;
        setDate({
            year: calendarDate.getFullYear(),
            month: calendarDate.getMonth() + 1
        })
    }

    const handleChangeMonth = () => {
        handleOnSetScheduleDate();
    }

    const addScheduleEvents = (start: Date, end: Date) => {
        queueMicrotask(() => {
            const calendar = calendarRef.current?.getApi();
            if (calendar == undefined) return;
            calendar.addEvent({
                start: start,
                end: end,
            })
        })
    }

    const handleOnClearCalendar = () => {
        queueMicrotask(() => {
            const calendar = calendarRef.current?.getApi();
            if (calendar == undefined) return;
            calendar.removeAllEvents();
        })
    }

    const customEventDisplay = (eventContent: EventContentArg) => (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            fontSize: "14px",
            background: theme.palette.primary.light,
            width: "100%",
            padding: 1
        }}>
            <Box>{eventContent.event.start!.getHours()}:{
                eventContent.event.start!.getMinutes() < 9
                    ? `0${eventContent.event.start!.getMinutes()}`
                    : eventContent.event.start!.getMinutes()
            }
            </Box>
            {eventContent.event.end != null ?
                <>
                    <div>-</div>
                    <div>{eventContent.event!.end.getHours()}:{
                        eventContent.event.end!.getMinutes() < 9 ?
                            `0${eventContent.event.end!.getMinutes()}`
                            : eventContent.event.end!.getMinutes()
                    }</div>
                </>
                : null
            }
        </Box>
    )

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FullCalendar
                        editable={true}
                        locale={"pl"}
                        ref={calendarRef}
                        selectable={true}
                        eventContent={customEventDisplay}
                        buttonText={{
                            today: "Dzisiaj"
                        }}
                        customButtons={{
                            addSchedule: {
                                text: "Dodaj garafik",
                                click: openAddScheduleModal
                            },
                            deleteSchedule: {
                                text: "Usuń",
                                click: () => {
                                    if (scheduleId == 0) return;
                                    deleteSchedule({userId, scheduleId});
                                }
                            },
                            prev: {
                                click: () => {
                                    calendarRef.current?.getApi().prev();
                                    handleChangeMonth();
                                }
                            },
                            next: {
                                click: () => {
                                    calendarRef.current?.getApi().next();
                                    handleChangeMonth();
                                }
                            },
                            today: {
                                text: "Dzisiaj",
                                click: () => {
                                    calendarRef.current?.getApi().today();
                                    handleChangeMonth();
                                }
                            },
                        }}
                        headerToolbar={{
                            right: `${manage ? "addSchedule deleteSchedule " : ""}today prev,next`,
                            center: '',
                            left: "title"
                        }}
                        plugins={[interactionPlugin, dayGridPlugin]}
                        initialView='dayGridMonth'
                        weekends={true}
                    />
                </Grid>
            </Grid>
            {
                addScheduleModal
                    ? <AddUserScheduleModal isOpen={addScheduleModal} onClose={closeAddScheduleModal}/>
                    : null
            }
        </>
    );
}

export default Schedule;