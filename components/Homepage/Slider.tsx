import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import { events } from "@/constants";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import Typography from "@mui/material/Typography";
import { Avatar, Button } from "@mui/material";
import { NavigationButton, SocialIcons } from "../helpers/atoms";
import { motion } from "framer-motion";
import TripOriginIcon from "@mui/icons-material/TripOrigin";
import { useGetEvents } from "@/utils/hooks/useEvents";
import { format } from "timeago.js";
import { EventFetched } from "@/types";
import Socials from "../utils/Socials";
import SliderLoading from "../loading/SliderLoading";
const Slider = () => {
  const { colors } = useGlobalTheme();
  const [direction, setDirection] = React.useState("right");
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const MotionBox = motion(Box);
  const [approvedEvents, setApprovedEvents] = React.useState<EventFetched[]>(
    []
  );
  const { data: events, isLoading } = useGetEvents();
  useEffect(() => {
    if (events) {
      setApprovedEvents(events.filter((event) => event.status === "approved"));
    }
  }, [events]);

  return isLoading ? (
    <SliderLoading />
  ) : (
    approvedEvents.map((event, index) => (
      <MotionBox
        bgcolor={colors.card}
        borderRadius={1}
        key={index}
        className=" w-full h-[350px] relative overflow-hidden bg-black/40 z-[1]"
        initial={{
          opacity: 0,
          display: "none",
        }}
        animate={{
          opacity: currentIndex === index ? 1 : 0,
          display: currentIndex === index ? "block" : "none",
        }}
        // transition={{ duration: 0.3 }}
      >
        <Box
          className="flex flex-col justify-between z-[3] h-full"
          p={2}
          pb={1}
        >
          <div className="flex justify-between items-center ">
            <div className="flex items-center">
              <Avatar src={event?.user.profileImage} />
              <Typography variant="body1" className="ml-2 font-bold">
                {event?.user.name}
              </Typography>
            </div>

            <NavigationButton
              handleFront={() => {
                setDirection("right");
                setCurrentIndex(
                  currentIndex === approvedEvents.length - 1
                    ? approvedEvents.length - 1
                    : currentIndex + 1
                );
              }}
              handleBack={() => {
                setDirection("left");
                setCurrentIndex(
                  currentIndex === 0
                    ? approvedEvents.length - 1
                    : currentIndex - 1
                );
              }}
              max={3}
              currentIndex={currentIndex}
            />
          </div>
          <div className="flex-col ">
            <Typography variant="h5">{event.title}</Typography>
            <div className="flex justify-between items-center w-full">
              <Socials
                {...{
                  likes: event.likes,
                  commentsParent: event._id,
                  type: "event",
                  _id: event._id,
                  owner: event.user._id,
                  ownerName: event.user.name,
                }}
              />

              <Button
                startIcon={
                  <TripOriginIcon
                    sx={{
                      fontSize: "15px",
                      color: colors.green[500],
                    }}
                  />
                }
              >
                {event.eventDate
                  ? event?.eventDate?.split("T")[0].split("-")[2] + "/"
                  : format(event?.createdAt)}
              </Button>
            </div>
          </div>
        </Box>

        <div className="absolute inset-0 z-[-1]">
          <Image
            alt={event.title}
            src={event.coverImage}
            className="h-full w-full object-cover z-[-1]"
            fill={true}
          />
        </div>
      </MotionBox>
    ))
  );
};

export default Slider;
