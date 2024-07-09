"use client";
import Grid from "@mui/material/Grid";
import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import Slider from "@/components/Homepage/Slider";
import CustomTimeline from "@/components/Homepage/CustomTimeline";
import { useGetEvents } from "@/utils/hooks/useEvents";
import { useAuth } from "@/utils/AuthContext";
import Title from "./components/Title";

const Home = () => {
  const { colors } = useGlobalTheme();
  const { data: events } = useGetEvents();
  const { communitiesIn } = useAuth();
  const { user } = useAuth();
  const cards = [
    {
      name: "Clubs",
      count: communitiesIn?.length,
      color: colors.red[400],
    },
    {
      name: "Events",
      count: events
        ? events.filter((event) => event.status === "approved").length
        : 0,
      color: colors.green[400],
    },
  ];
  return (
    <Box p={1}>
      <Title title="Vora Dashboard" />
      <Box
        className="flex justify-between items-center gap-2 py-0"
        sx={{
          flexDirection: {
            xs: "column",
            lg: "row",
          },
        }}
      >
        <Box
          borderRadius={1}
          bgcolor={colors.card}
          p={2}
          className="flex flex-col gap-3 lg:h-[185px] w-full "
        >
          <Typography variant="h3">Welcome Back {user.name}</Typography>
          <Typography variant="body2">
            Tip: You can create a new club or event by clicking on the plus. To
            Write a blog please use a laptop or desktop.Am working on integating
            AI to help you guys.
          </Typography>
          <Button
            className={`w-fit`}
            sx={{
              bgcolor: `${colors.indigo[500]} !important`,
            }}
          >
            Continue
          </Button>
        </Box>
        <Box className="h-full w-full flex gap-2 items-center">
          {cards.map((card, index) => (
            <Box
              key={index}
              bgcolor={colors.card}
              borderRadius={1}
              p={3}
              className="flex flex-col h-full w-full lg:h-[185px] "
            >
              <div className="flex gap-4">
                <Box bgcolor={card.color} className="flex-center h-6 w-6">
                  <CheckIcon />
                </Box>
                <Typography variant="h3">{card.name}</Typography>
              </div>
              <Typography variant="h1" fontWeight={700}>
                {card.count}
              </Typography>
              {/* line 2px thick red[400] */}
              <Box
                sx={{
                  height: "2px",
                  bgcolor: `${card.color} !important`,
                  width: "100%",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <Grid container className="mt-1  flex justify-between " rowSpacing={1}>
        <Grid item xs={12} lg={4}>
          <CustomTimeline />
        </Grid>
        <Grid item xs={12} lg={7.8}>
          <Slider />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
