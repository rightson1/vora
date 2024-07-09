"use client";
import React from "react";
import Box from "@mui/material/Box";
import { CardScroll, CustomCard } from "@/components/helpers/atoms";
import { useGlobalTheme } from "@/utils/themeContext";
import { EventFetched } from "@/types";
import Typography from "@mui/material/Typography";
const Events = ({ events }: { events: EventFetched[] }) => {
  const { colors } = useGlobalTheme();
  const upcomingEvents = events?.filter((event) => event.status === "approved");
  const proposedEvents = events?.filter((event) => event.status === "pending");
  const previousEvents = events?.filter((event) => event.status === "past");
  return (
    <Box>
      <CardScroll title="Upcoming Events">
        {upcomingEvents ? (
          upcomingEvents.map((event, index) => {
            return <CustomCard key={index} event={event} />;
          })
        ) : (
          <Typography variant="body1" color="textSecondary">
            No upcoming events
          </Typography>
        )}
      </CardScroll>
      <CardScroll title="Proposed Events">
        {proposedEvents.length > 0 ? (
          proposedEvents.map((event, index) => {
            return <CustomCard key={index} event={event} />;
          })
        ) : (
          <Typography variant="body1" color="textSecondary">
            No proposed events
          </Typography>
        )}
      </CardScroll>
      <CardScroll title="Previous Events">
        {previousEvents.length > 0 ? (
          previousEvents.map((event, index) => {
            return <CustomCard key={index} event={event} />;
          })
        ) : (
          <Typography variant="body1" color="textSecondary">
            No previous events
          </Typography>
        )}
      </CardScroll>
    </Box>
  );
};

export default Events;
