"use client";
import React from "react";
import Box from "@mui/material/Box";
import Events from "../../../components/tabs/Events";
import { useAuth } from "@/utils/AuthContext";
import { communitiesInIds } from "@/components/helpers/functions";
import { useGetEvents } from "@/utils/hooks/useEvents";
import ImageListItem from "@mui/material/ImageListItem";
import { LoadingCard } from "@/components/loading/LoadingAtoms";
import EventsLoading from "@/components/loading/EventsLoading";
import Title from "../components/Title";

const Event = () => {
  const { user } = useAuth();
  const { data: events, isLoading } = useGetEvents();
  if (isLoading) {
    return <EventsLoading />;
  }
  if (!events && !isLoading) {
    return <div>No events</div>;
  }
  return (
    <Box m={1} pt={1}>
      <Title title="Events" />
      <Events events={events} />
    </Box>
  );
};

export default Event;
