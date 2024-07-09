"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";

const events = [{ title: "Meeting", start: new Date() }];

export default function DemoApp() {
  const { colors } = useGlobalTheme();
  function handleEventAdd() {}
  function handleEventChange() {}
  function handleEventRemove() {}
  function handleDateSelect() {}
  function handleEventClick() {}
  function handleEvent() {}
  function handleDelete() {}
  const handleDateClick = async (selected: any) => {
    await new Promise((resolve) => setTimeout(resolve, 10));
  };
  return (
    <Box m={1}>
      <Box
        bgcolor={colors.surface}
        p={1}
        sx={{
          "& .fc-header-toolbar": {
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            fontSize: "16px",
            margin: "10px 0",
            justifyItems: "space-between !important",
            gap: "10px",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            "& .fc-toolbar-chunk": {
              display: "flex",
              alignItems: "center",
              gap: "10px",
              "& .fc-button": {
                backgroundColor: colors.surface,
                color: colors.textSecondary,
                border: `1px solid ${colors.textSecondary}`,
                padding: "3px 8px",
                "&:hover": {
                  backgroundColor: colors.surface,
                  color: colors.text,
                },
              },
              "& .fc-toolbar-title": {
                color: colors.textSecondary,
                fontSize: "16px",
              },
            },
            // all border textSecondary border radius 5
          },
          "& .fc-theme-standard td, .fc-theme-standard th ": {
            color: colors.textSecondary,
            borderColor: colors.textSecondary,
          },
          "& .fc-theme-standard .fc-scrollgrid": {
            borderColor: colors.textSecondary,
          },
        }}
      >
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
            listPlugin,
          ]}
          headerToolbar={{
            left: "prev,next,today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
          }}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          initialView="dayGridMonth"
          select={handleDateClick}
          weekends={false}
          eventAdd={handleEvent}
          eventChange={function () {}}
          eventRemove={handleDelete}
          longPressDelay={1}
          events={events}
          eventContent={renderEventContent}
        />
      </Box>
    </Box>
  );
}
function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
