import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Grid } from "@mui/material";
import React, { createRef, useState } from "react";
import { DateSelectArg, EventClickArg, EventContentArg } from "@fullcalendar/core";
import CalendarAddEventModal from "../../../features/modals/CalendarAddEventModal";

interface EmployeeScheduleProps {
    editable: boolean
}

const ManagementEmployeeSchedule = ({ editable }: EmployeeScheduleProps) => {
    const [addEventModal, setAddEventModal] = useState(false);
    const [eventInfo, setEventInfo] = useState<DateSelectArg | null>(null);
    const [eventToEdit, setEventToEdit] = useState<EventClickArg | null>(null);
    const calendarRef = createRef<FullCalendar>();

    const onOpenAddEventModal = (eventInfo?: DateSelectArg) => {
        setEventInfo(eventInfo ?? null);
        setAddEventModal(true);
    }

    const onCloseAddEventModal = () => {
        setAddEventModal(false)
        setEventInfo(null);
        setEventToEdit(null);
    }

    const onClickEvent = (clickInfo: EventClickArg) => {
        setEventToEdit(clickInfo);
        setAddEventModal(true);
    }

    const customEventDisplay = (eventContent: EventContentArg) => (
        <Box sx={{ display: "flex", gap: 1 }}>
            <div>{eventContent.event.start?.getHours()}:{
                eventContent.event.end == null
                    ? eventContent.event.start?.getMinutes()
                    : eventContent.event.end.getMinutes()}
            </div>
            {eventContent.event.end != null ?
                <>
                    <div>-</div>
                    <div>{eventContent.event!.end.getHours()}:{eventContent.event!.end.getMinutes()}</div>
                </>
                : null
            }
            <b>{eventContent.event.title}</b>
        </Box>
    )

    return (
        <>
            <Grid container>
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
                            customButton: {
                                text: "Dodaj wydarzenie",
                                click: () => onOpenAddEventModal()
                            },
                        }}
                        headerToolbar={{
                            right: 'customButton today prev,next',
                            center: '',
                            left: "title"
                        }}
                        plugins={[interactionPlugin, dayGridPlugin]}
                        initialView='dayGridMonth'
                        weekends={false}
                        select={onOpenAddEventModal}
                        eventClick={onClickEvent}
                    />
                </Grid>
            </Grid>
            <CalendarAddEventModal
                open={addEventModal}
                onClose={onCloseAddEventModal}
                eventInfo={eventInfo}
                calendarRef={calendarRef}
                eventToEdit={eventToEdit}
            />
        </>
    )
}

export default ManagementEmployeeSchedule;