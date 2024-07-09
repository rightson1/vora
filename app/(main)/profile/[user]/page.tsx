"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import { useGlobalTheme } from "@/utils/themeContext";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CelebrationIcon from "@mui/icons-material/Celebration";
import PeopleIcon from "@mui/icons-material/People";
import BookIcon from "@mui/icons-material/Book";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeIcon from "@mui/icons-material/Home";
import ImageIcon from "@mui/icons-material/Image";
import Profile from "@/components/tabs/profile";
import { motion } from "framer-motion";
import Event from "@/components/tabs/Events";
import { Avatar } from "@mui/material";
import { SocialButtons } from "@/components/helpers/atoms";
import { LinkType } from "@/types";
import { useParams } from "next/navigation";
import { useGetUserPosts } from "@/utils/hooks/usePosts";
import { useGetEvents, useGetUserEvents } from "@/utils/hooks/useEvents";
import { useFetchUser, useGetUser } from "@/utils/hooks/useUser";
import { useGetCommunities } from "@/utils/hooks/useCommunity";
import EventsLoading from "@/components/loading/EventsLoading";
import ProfileLoadingSkeleton from "@/components/loading/ProfileLoadingSkeleton";
import UserProfileLoading from "@/components/loading/UserProfileLoading";
import Title from "../../components/Title";
const Community = () => {
  const { colors } = useGlobalTheme();
  const [value, setValue] = React.useState(0);
  const [links, setLinks] = useState<LinkType[]>([]);
  const params = useParams();
  const { data: user, isLoading } = useGetUser(params.user);

  const { data: events, isLoading: eventsLoading } = useGetUserEvents(
    user?._id
  );
  const { data: communities } = useGetCommunities();

  const { data: blogs, isLoading: postLoading } = useGetUserPosts(params.user);
  useEffect(() => {
    if (user) {
      const links = user.links;
      setLinks(links);
    }
  }, [user]);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  if (user) {
    const clubInfo = [
      {
        name: "Communities",
        icon: <PeopleIcon />,
        //communies where community.users.includes(user._id)
        value: communities
          ? communities?.filter((community) =>
              community.users.find((user) => user._id === user?._id)
            ).length
          : 0,
      },
      {
        name: "Posts",
        icon: <BookIcon />,
        value: blogs?.length || 0,
      },
      {
        name: "Events",
        icon: <CelebrationIcon />,
        value: events?.length || 0,
      },
    ];
    //home memebers event gallery
    const profileTabs = [
      {
        name: "Home",
        icon: <HomeIcon />,
        value: 0,
        component: (
          <Profile bio={user?.bio} blogs={blogs} isLoading={postLoading} />
        ),
      },
      {
        name: "Events",
        icon: <PeopleIcon />,
        value: 1,
        component: eventsLoading ? (
          <EventsLoading />
        ) : events ? (
          <Event events={events} />
        ) : (
          <Typography variant="body1" color="textSecondary">
            No events
          </Typography>
        ),
      },
    ];

    return (
      <Box p={1}>
        <Title title={user?.name} />
        <Box
          bgcolor={colors.surface}
          borderRadius={1}
          className="overflow-hidden"
        >
          <div className="relative">
            <Image
              src={user?.coverImage || "https://placehold.co/600x400"}
              alt={user?.displayName || ""}
              height={1000}
              unoptimized
              className="h-[200px] w-full object-cover "
              width={1000}
            />{" "}
            <div
              className="flex flex-col items-center -bottom-20 left-1/2
             translate-x-[-50%]  absolute"
            >
              <Avatar
                alt={user?.displayName}
                sx={{
                  width: 80,
                  height: 80,
                  // border: `2px solid ${colors.}`,
                }}
                src={user?.profileImage || "https://placehold.co/600x400"}
              />
              <Box className="flex-col items-center justify-center w-full ">
                <Typography variant="h4" className="mt-2 text-center">
                  {user?.name}
                </Typography>
                <Typography variant="body1" className="mb-2 text-center">
                  {user.profession}
                </Typography>
              </Box>
            </div>
          </div>

          <Grid
            container
            sx={{
              mt: 10,
            }}
            p={1}
            spacing={2}
          >
            {/* first on large screnn second on small */}
            <Grid item xs={12} lg={8} className="flex justify-between px-4 ">
              {clubInfo.map((item, index) => (
                <div className="flex-col items-center">
                  <Button className="flex flex-col">
                    {item.icon}
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2">{item.value}</Typography>
                  </Button>
                </div>
              ))}
            </Grid>
            {/* the Grid item below should come first when in xs */}

            {/* should come last always */}
            <Grid
              item
              xs={12}
              lg={4}
              className="flex gap-2 justify-center items-center lg:justify-end md:w-full "
            >
              <SocialButtons links={links} />
            </Grid>
          </Grid>
          <Box sx={{ width: "100%", bgcolor: colors.card }} pb={0.2}>
            <Tabs value={value} onChange={handleChange} centered>
              {profileTabs.map((item, index) => (
                <Tab label={item.name} key={index} />
              ))}
            </Tabs>
          </Box>
        </Box>

        <Box mt={1}>
          {profileTabs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20, display: "none" }}
              animate={{
                opacity: value === item.value ? 1 : 0,
                x: value === item.value ? 0 : -20,
                display: value === item.value ? "block" : "none",
              }}
              transition={{ duration: 0.3 }}
            >
              {item.component}
            </motion.div>
          ))}
        </Box>
      </Box>
    );
  }
  if (isLoading) return <UserProfileLoading />;
  return <Typography variant="body1">User not found</Typography>;
};

export default Community;
