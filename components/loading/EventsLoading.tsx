import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { EventLoadingCard } from "./LoadingAtoms";
const EventsLoading = () => {
  return Array(3)
    .fill(0)
    .map((item, index) => (
      <Box m={1} className="flex flex-col gap-5" key={index}>
        <div className="flex items-center justify-between">
          <Skeleton animation="wave" variant="text" width={200} height={40} />
          <div className="flex items-center gap-1">
            <Skeleton animation="wave" variant="text" width={30} height={40} />
            <Skeleton animation="wave" variant="text" width={30} height={40} />
          </div>
        </div>
        <div className="flex gap-5">
          {Array(3)
            .fill(0)
            .map((item, index) => (
              <EventLoadingCard key={index} />
            ))}
        </div>
      </Box>
    ));
};

export default EventsLoading;
