import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { quickLinks } from "@/constants";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CampaignIcon from "@mui/icons-material/Campaign";
import CelebrationIcon from "@mui/icons-material/Celebration";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import Avatar from "@mui/material/Avatar";
import { useGlobalTheme } from "@/utils/themeContext";
const Apps = () => {
  const { colors } = useGlobalTheme();
  const apps = [
    {
      name: "Communities",
      icon: <PeopleIcon />,
      info: "3 communities",
    },
    {
      name: "Events",
      icon: <CelebrationIcon />,
      info: "3 new",
    },
    {
      name: "Blogs",
      icon: <BookIcon />,
      info: "3 new ",
    },
    {
      name: "Chat",
      icon: <ChatBubbleOutlineIcon />,
      info: "3 new",
    },
    {
      name: "Announcements",
      icon: <CampaignIcon />,
      info: "3 new ",
    },
    {
      name: "Calender",
      icon: <EditCalendarIcon />,
      info: "add event",
    },
  ];
  return (
    <Grid container spacing={2} sx={{ p: 2 }} className="max-w-[650px]">
      <Grid xs={8} item sm={8}>
        <Grid container spacing={2} sx={{ p: 2 }}>
          {apps.map((app, index) => (
            <Grid
              item
              xs={12}
              md={6}
              className="w-full flex gap-2 items-center"
              p={1}
              borderBottom={1}
              borderColor={colors.surface}
            >
              <Avatar>{app.icon}</Avatar>
              <div className="flex-col-start w-full">
                <Typography variant="h6" className="w-full">
                  {app.name}
                </Typography>
                <div className="fb w-full">
                  <Typography variant="body2" color={colors.green[600]}>
                    {app.info}
                  </Typography>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={4} md={4}>
        <Typography variant="h5" py={2}>
          Quick Links
        </Typography>
        <Grid container spacing={1}>
          {quickLinks.map((link, index) => (
            <Grid key={index} item xs={12} md={6}>
              <Link href={link.link}>
                {/* <IconButton> */}
                <Typography variant="h6" color={colors.text}>
                  {link.title}
                </Typography>
                {/* </IconButton> */}
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Apps;
