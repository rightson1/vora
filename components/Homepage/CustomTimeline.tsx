import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import Typography from "@mui/material/Typography";
export default function CustomTimeline() {
  const { colors } = useGlobalTheme();

  return (
    <Box
      borderRadius={1}
      bgcolor={colors.card}
      p={2}
      className="h-[350px] flex justify-center items-center flex-col"
    >
      <Typography variant="h5" textAlign={"start"} className="w-full">
        My Day
      </Typography>
      <div className="h-full overflow-auto">
        <Timeline
          position="alternate"
          sx={{
            "& .MuiTimelineOppositeContent-root": {
              color: `${colors.text} !important`,
              opacity: 0.5,
            },
          }}
        >
          {timeline.map((item, index) => (
            <TimelineItem
              key={index}
              sx={{
                "& .MuiTimelineDot-root": {
                  bgcolor: `${
                    index % 2 === 0 ? colors.red[400] : colors.green[400]
                  } !important`,
                },
              }}
            >
              <TimelineOppositeContent color="text.secondary">
                {item.time}
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>{item.title}</TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
    </Box>
  );
}
const timeline = [
  {
    time: "09:30 am",
    title: "Eat",
  },
  {
    time: "10:00 am",
    title: "Sleep",
  },
  {
    time: "12:00 am",
    title: "Sleep",
  },
  {
    time: "9:00 am",
    title: "Repeat",
  },
];
