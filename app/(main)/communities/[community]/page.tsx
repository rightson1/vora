"use client";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Image from "next/image";
import { useGlobalTheme } from "@/utils/themeContext";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CelebrationIcon from "@mui/icons-material/Celebration";
import PeopleIcon from "@mui/icons-material/People";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeIcon from "@mui/icons-material/Home";
import ImageIcon from "@mui/icons-material/Image";
import { useParams } from "next/navigation";
import { useGetCommunities } from "@/utils/hooks/useCommunity";
import { CommunityFetched, CommunityImageFetched } from "@/types";
import { motion } from "framer-motion";
import { format } from "timeago.js";
import ProfileLoadingSkeleton from "@/components/loading/ProfileLoadingSkeleton";
import { SocialButtons } from "@/components/helpers/atoms";
import Profile from "@/components/tabs/profile";
import Members from "@/components/tabs/Members";
import Events from "@/components/tabs/Events";
import Gallery from "@/components/tabs/Gallery";
import { useAuth } from "@/utils/AuthContext";
import { useRouter } from "next/navigation";
import BookIcon from "@mui/icons-material/Book";
import NotUser from "../components/NotUser";
import toast from "react-hot-toast";
import { useIsCommunityUser } from "@/components/helpers/functions";
import { useGetEvents } from "@/utils/hooks/useEvents";
import EventsLoading from "@/components/loading/EventsLoading";
import { useGetCommunityPosts, useGetPosts } from "@/utils/hooks/usePosts";
import Title from "../../components/Title";
const Community = () => {
  const { colors } = useGlobalTheme();
  const params = useParams();
  const { user } = useAuth();
  const [value, setValue] = React.useState(0);
  const router = useRouter();
  const { data: events, isLoading: eventsLoading } = useGetEvents();
  const { data: blogs, isLoading: postLoading } = useGetCommunityPosts(
    params.community
  );
  const [communityAdmin, setCommunityAdmin] =
    React.useState<CommunityImageFetched | null>(null);
  const [community, setCommunity] = React.useState<CommunityFetched | null>(
    null
  );
  const [onTour, setOnTour] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const { data, isLoading } = useGetCommunities();

  useEffect(() => {
    if (data) {
      const community = data.find((item) => item._id === params.community);
      community && setCommunity(community);
    }
  }, [data]);
  const isMember = useIsCommunityUser("member", community?._id);
  const isAdmin = useIsCommunityUser("admin", community?._id);
  if (!community) return <ProfileLoadingSkeleton />;
  if (community) {
    const clubInfo = [
      {
        name: "Members",
        icon: <PeopleIcon />,
        value: community?.users.length,
      },
      {
        name: "Events",
        icon: <CelebrationIcon />,
        value:
          events?.filter((event) => event.communityId === community._id)
            .length || 0,
      },
      {
        name: "Posts",
        icon: <BookIcon />,
        value: blogs?.length || 0,
      },
    ];
    const clubTabs = [
      {
        name: "Home",
        icon: <HomeIcon />,
        value: 0,
        component: (
          <Profile
            bio={community.description}
            blogs={blogs}
            isLoading={postLoading}
          />
        ),
      },
      {
        name: "Members",
        icon: <PeopleIcon />,
        value: 1,
        component: (
          <Members users={community.users} communityId={community._id} />
        ),
      },
      {
        name: "Events",
        icon: <CelebrationIcon />,
        value: 2,
        component: events ? (
          <Events
            events={events.filter(
              (event) => event.communityId === community._id
            )}
          />
        ) : eventsLoading ? (
          <EventsLoading />
        ) : (
          <Typography variant="h4">No Events</Typography>
        ),
      },
      {
        name: "Gallery",
        icon: <ImageIcon />,
        value: 3,
        component: <Gallery community={community} onTour={onTour} />,
      },
    ];
    return (
      <Box p={1} mb={10}>
        <Title title={community.title} />
        {isMember || onTour ? (
          <>
            {" "}
            <Box
              bgcolor={colors.surface}
              borderRadius={1}
              className="overflow-hidden"
            >
              <div className="relative">
                <Image
                  src={community?.coverImage}
                  alt={community?.title}
                  height={1000}
                  unoptimized
                  className="h-[200px] w-full object-cover "
                  width={1000}
                />{" "}
                {onTour ? (
                  <Button
                    disabled={!isAdmin}
                    variant="contained"
                    className="absolute top-2 right-2"
                    size="small"
                    onClick={() => setOnTour(false)}
                  >
                    Join
                  </Button>
                ) : (
                  <Button
                    disabled={!isAdmin}
                    variant="contained"
                    className="absolute top-2 right-2"
                    size="small"
                    onClick={() =>
                      router.push(`/communities/${community._id}/edit`)
                    }
                  >
                    Edit
                  </Button>
                )}
                <div
                  className="flex flex-col items-center -bottom-20 left-1/2
             translate-x-[-50%]  absolute"
                >
                  <Image
                    src={community?.profileImage}
                    alt={community?.title}
                    height={1000}
                    unoptimized
                    className="h-[70px] w-[70px] rounded-full "
                    width={1000}
                  />
                  <Box className="flex-col items-center justify-center w-full ">
                    <Typography variant="h4" className="mt-2 text-center">
                      {community?.title}
                    </Typography>
                    <Typography variant="body2" className="mb-2 text-center">
                      {format(community?.createdAt)}
                    </Typography>
                  </Box>
                </div>
              </div>

              <Grid
                container
                sx={{
                  mt: {
                    xs: 10,
                    md: 8,
                  },
                }}
                p={1}
                spacing={2}
              >
                {/* first on large screnn second on small */}
                <Grid
                  item
                  xs={12}
                  lg={8}
                  className="flex gap-5 px-4 justify-center  "
                >
                  {clubInfo.map((item, index) => (
                    <div className="flex-col items-center" key={index}>
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
                  className="flex gap-2 justify-center items-center  md:w-full "
                >
                  <SocialButtons links={community.links} />
                </Grid>
              </Grid>
              <Box sx={{ width: "100%", bgcolor: colors.card }} pb={0.2}>
                <Tabs value={value} onChange={handleChange} centered>
                  {clubTabs.map((item, index) => (
                    <Tab label={item.name} key={index} />
                  ))}
                </Tabs>
              </Box>
            </Box>
            <Box mt={1}>
              {clubTabs.map((item, index) => (
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
          </>
        ) : (
          <NotUser community={community} setOnTour={setOnTour} />
        )}
      </Box>
    );
  }
};

export default Community;
