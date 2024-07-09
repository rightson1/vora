"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { menuType, openProps } from "@/types";
import { Button, Chip, MenuItem, useMediaQuery } from "@mui/material";
import Image from "next/image";
import StarRateIcon from "@mui/icons-material/StarRate";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CampaignIcon from "@mui/icons-material/Campaign";
import CelebrationIcon from "@mui/icons-material/Celebration";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import HomeIcon from "@mui/icons-material/Home";
import { useGlobalTheme } from "@/utils/themeContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/AuthContext";
import {
  useAnnouncementsCount,
  useBlogsCount,
  useEventsCount,
} from "@/components/helpers/functions";
import { useGetPosts } from "@/utils/hooks/usePosts";
import { useGetEvents } from "@/utils/hooks/useEvents";
import { useGetAnnouncements } from "@/utils/hooks/useAnnouncements";
import { usePathname } from "next/navigation";
const drawerWidth = "220px";

export default function Sidebar({ open, setOpen }: openProps) {
  const theme = useTheme();
  const { colors } = useGlobalTheme();
  const { user, communitiesIn } = useAuth();
  const router = useRouter();
  const screenWidth = useMediaQuery(theme.breakpoints.up("md"));

  const { data: blogs } = useGetPosts();
  const { data: events } = useGetEvents();
  const { data: announcements } = useGetAnnouncements();
  const countAnnouncement = useAnnouncementsCount(announcements);
  const eventsCount = useEventsCount("approved", events);
  const blogsCount = useBlogsCount(blogs);
  const pathname = usePathname();
  const [active, setActive] = React.useState("/");
  console.log("pathname", pathname);
  //setOpen(false) when pathname changes
  React.useEffect(() => {
    setOpen(false);
    setActive(pathname);
  }, [pathname]);

  const pages = [
    {
      name: "School",
      icon: <SchoolIcon />,
      info: "new",
      active: true,
    },
    {
      name: "Eccomerce",
      icon: <AttachMoneyIcon />,
      info: "2",
      active: false,
    },
  ];
  const menu: menuType[] = [
    {
      name: "Pages",
      links: [
        {
          name: "Home",
          icon: <HomeIcon />,
          link: "/",
          active: active === "/",
        },
      ],
    },
    {
      name: "Apps",
      //Communities,Events,Blogs,Chat,Announcements,Calender
      links: [
        {
          name: "Communities",
          icon: <PeopleIcon />,
          info: `${communitiesIn.length}`,
          link: "/communities",
          active: active === "/communities",
        },
        {
          name: "Events",
          icon: <CelebrationIcon />,
          info: `${eventsCount}`,
          link: "/events",
          active: active === "/events",
        },
        {
          name: "Posts & Blogs",
          icon: <BookIcon />,
          info: `${blogsCount}`,
          link: "/posts",
          active: active === "/posts",
        },
        // {
        //   name: "Chat",
        //   icon: <ChatBubbleOutlineIcon />,
        //   info: "3",
        //   link: "/chat",
        // },
        {
          name: "Announcements",
          icon: <CampaignIcon />,
          info: `${countAnnouncement}`,
          link: "/announcements",
          active: active === "/announcements",
        },
        {
          name: "Rate Lecture",
          icon: <StarRateIcon />,
          info: `new`,
          link: "/lectures",
        },
      ],
    },
  ];

  const DesktopDrawer = ({ children }: { children: React.ReactNode }) => {
    return (
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {children}
      </Drawer>
    );
  };
  const DrawerContent = () => {
    return (
      <>
        <div className="flex items-center justify-between">
          <Box
            component="img"
            mb={1}
            src="/vora.svg"
            alt="logo"
            sx={{
              width: "100px",
            }}
            p={1}
          />
        </div>
        <Divider />
        {/* <List>
          {pages.map((text, index) => (
            <Box
              key={index}
              // className="w-full fb px-3 py-1"
              className="cursor-pointer"
              sx={{
                width: "100%",
                "&:hover": {
                  bgcolor: `${colors.active} !important`,
                },
                display: "flex !important",
                justifyContent: "space-between",
                alignItems: "center",
                px: 2,
                py: 1,
                bgcolor: text.active ? `${colors.active} !important` : "",
              }}
            >
              <Button disableRipple startIcon={text.icon}>
                {text.name}
              </Button>
              <Chip
                label={text.info}
                size="small"
                variant="filled"
                color="secondary"
              />
            </Box>
          ))}
        </List> */}
        <Divider />
        {menu.map((item, index) => (
          <div key={index} className="">
            <List disablePadding>
              <ListItem>
                <ListItemText primary={item.name} />
              </ListItem>
            </List>
            <List disablePadding>
              {item.links.map((text, index) => {
                return (
                  <MenuItem
                    onClick={() => router.push(text.link)}
                    className="cursor-pointer"
                    // className="w-full fb px-4 py-1 cursor-pointer transition-all duration-300 ease-in-out"
                    sx={{
                      "&:hover": {
                        bgcolor: `${colors.active} !important`,
                      },
                      backgroundColor: `${
                        active === text.link ? colors.active : colors.surface
                      } !important`,
                      display: "flex !important",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 2,
                      py: 1,
                      width: "100%",
                    }}
                    key={text.name}
                  >
                    <Button disableRipple startIcon={text.icon}>
                      {text.name}
                    </Button>
                    {text.info && (
                      <Chip
                        label={text.info}
                        size="small"
                        variant="filled"
                        color="secondary"
                      />
                    )}
                  </MenuItem>
                );
              })}
            </List>
            <Divider />
          </div>
        ))}
      </>
    );
  };
  return screenWidth ? (
    <DesktopDrawer>
      <DrawerContent />
    </DesktopDrawer>
  ) : (
    <Drawer
      open={open}
      anchor="left"
      onClose={() => setOpen(false)}
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <DrawerContent />
    </Drawer>
  );
}
