import { useGlobalTheme } from "@/utils/themeContext";
import { styled, useTheme } from "@mui/material/styles";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import { useAuth } from "@/utils/AuthContext";
import { useRouter } from "next/navigation";
import { useGetEvents, useGetUserEvents } from "@/utils/hooks/useEvents";
import ProfileLoading from "@/components/loading/ProfileLoading";
import { format } from "timeago.js";
import { useGetUserPosts } from "@/utils/hooks/usePosts";

const Rightbar = () => {
  const theme = useTheme();
  const { colors } = useGlobalTheme();
  const router = useRouter();
  const { user, admin, communitiesIn } = useAuth();
  const { data: events, isLoading } = useGetEvents();
  const { data: userEvents } = useGetUserEvents(user._id);
  const { data: posts } = useGetUserPosts(user._id);
  const screenWidth = useMediaQuery(theme.breakpoints.up("md"));

  const drawerWidth = "240px";
  return (
    <Drawer
      variant={screenWidth ? "persistent" : "temporary"}
      anchor="right"
      open={screenWidth}
      sx={{
        width: screenWidth ? drawerWidth : 0,
        flexShrink: 0,
        // height: "100vh",
        overflow: "hidden !important",
        "& .MuiDrawer-paper": {
          width: screenWidth ? drawerWidth : 240,
          boxSizing: "border-box",
          height: "100vh",
          overflow: "hidden !important",
        },
      }}
    >
      <div className="flex flex-col items-center gap-5 px-2 py-4">
        <div className="w-full fb">
          <Button
            variant="text"
            onClick={() => router.push(`/profile/${user._id}`)}
          >
            Profile
          </Button>
          <Button
            variant="contained"
            onClick={() => router.push("/profile/edit")}
          >
            Edit
          </Button>
        </div>
        <div className="w-full flex flex-col items-center mt-5 gap-1">
          <div className="flex flex-col items-center">
            <div className={`p-[9px] ring-[.5px] ring-[#1FDF64] rounded-full`}>
              <div className={`p-[6px] ring-[1px] ring-[#1FDF64] rounded-full`}>
                <div
                  className={`p-1 ring-[2px] ring-[#1FDF64] rounded-full flex-center w-[55px] h-[55px]`}
                >
                  <Avatar
                    sx={{
                      height: "50px",
                      width: "50px",
                    }}
                    className="shadow-md"
                    src={user?.profileImage}
                    alt={user?.name}
                  />
                </div>
              </div>
              {/* names */}
            </div>
            <Typography variant="h6" className="text-white">
              {user?.name}
            </Typography>
            <Typography variant="body2" className="text-white">
              {user.profession || "No profession"}
            </Typography>
          </div>

          <Box
            className={`flex items-center justify-evenly w-full shadow-md`}
            bgcolor={colors.active}
            sx={{
              borderRadius: 1,
            }}
            my={1}
          >
            <Button variant="text" className={`flex-col-center`}>
              <Typography variant="h6">Events</Typography>
              <Typography variant="body2">
                {userEvents ? userEvents.length : 0}
              </Typography>
            </Button>
            <Button variant="text" className={`flex-col-center`}>
              <Typography variant="h6">Clubs</Typography>
              <Typography variant="body2">{communitiesIn.length}</Typography>
            </Button>
            <Button variant="text" className={`flex-col-center`}>
              <Typography variant="h6">Posts</Typography>
              <Typography variant="body2">
                {posts ? posts?.length : 0}
              </Typography>
            </Button>
          </Box>
          <Box
            py={2}
            className={`flex-col-start w-full `}
            sx={{
              borderRadius: 1,
            }}
          >
            <Typography variant="h5" pb={1}>
              Events
            </Typography>
            <div className="flex-col-start gap-[2px] my-2 max-h-[300px] overflow-auto  w-full">
              {events ? (
                events.map((event, i) => (
                  <Box
                    className="w-full flex gap-2 items-center shadow-lg cursor-pointer"
                    key={i}
                    borderBottom={1}
                    borderRadius={1}
                    bgcolor={colors.active}
                    p={1}
                    borderColor={colors.card}
                    onClick={() => router.push(`/events/${event._id}`)}
                  >
                    <Avatar src={event.coverImage} alt="event" />
                    <div className="flex-col-start w-full">
                      <Typography variant="h6" className="w-full">
                        {event.title}
                      </Typography>
                      <div className="fb w-full">
                        {/* <Typography variant="body2">
                          {event.venue || "Non"}
                        </Typography> */}
                        <Typography variant="body2" color={colors.green[500]}>
                          {
                            //event community
                            communitiesIn.find(
                              (community) => community._id === event.communityId
                            )?.title
                          }
                        </Typography>
                      </div>
                    </div>
                  </Box>
                ))
              ) : isLoading ? (
                Array(5)
                  .fill(0)
                  .map((_, i) => <ProfileLoading key={i} />)
              ) : (
                <Typography variant="body2" color={colors.green[500]}>
                  No events
                </Typography>
              )}
            </div>
          </Box>
        </div>
      </div>
    </Drawer>
  );
};

export default Rightbar;
