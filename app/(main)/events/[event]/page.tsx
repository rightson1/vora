"use client";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import Image from "next/image";
import { ShareLink, SocialIcons } from "@/components/helpers/atoms";
import IconButton from "@mui/material/IconButton";
import { CommentInput } from "@/components/helpers/inputs";
import { useGetEvents } from "@/utils/hooks/useEvents";
import { useParams } from "next/navigation";
import BEALoading from "@/components/loading/BEALoading";
import { useGetCommunities } from "@/utils/hooks/useCommunity";
import { Prose } from "@/components/helpers/molecules";
import { useGetComments } from "@/utils/hooks/useComments";
import Comment from "@/components/utils/Comments";
import CommentLoading from "@/components/loading/CommentsLoading";
import Comments from "@/components/utils/Comments";
import Button from "@mui/material/Button";
import { useIsCommunityUser } from "@/components/helpers/functions";
import { useAuth } from "@/utils/AuthContext";
import { useRouter } from "next/navigation";
import Socials from "@/components/utils/Socials";
import Title from "../../components/Title";

const Event = () => {
  const { colors } = useGlobalTheme();
  const { data: events, isLoading } = useGetEvents();
  const params = useParams();
  const router = useRouter();
  const [community, setCommunity] = React.useState("");
  const event = events?.find((item) => item._id === params.event);
  const { data: communities } = useGetCommunities();
  const isAdmin = useIsCommunityUser("admin", event?.communityId);
  const { user } = useAuth();
  const [editButton, setEditButton] = React.useState(false);
  const { data: comments, isLoading: commentsLoading } = useGetComments(
    params.event
  );

  useEffect(() => {
    if (event) {
      const community = communities?.find(
        (item) => item._id === event?.communityId
      );
      community && setCommunity(community?.title);
      setEditButton(isAdmin || event.userId === user?._id);
    }
  }, [event, communities]);

  if (isLoading) return <BEALoading />;

  if (event) {
    return (
      <Box m={1}>
        <Title title={event.title} />
        <Box
          borderRadius={1}
          bgcolor={colors.surface}
          className="overflow-hidden"
        >
          <div className="relative">
            <Image
              src={event?.coverImage}
              width={1000}
              height={1000}
              alt={event?.title}
              className="w-full h-[300px] object-cover "
            />
            {editButton && (
              <Button
                disabled={!isAdmin}
                variant="contained"
                className="absolute top-2 right-2"
                size="small"
                onClick={() => router.push(`/events/${event._id}/edit`)}
              >
                Edit
              </Button>
            )}
          </div>

          <Box p={1} className="space-y-3">
            <div className="flex items-center justify-between">
              <div
                className="space-y-2"
                onClick={() => router.push(`/profile/${event.userId}`)}
              >
                <Avatar alt={event.user.name} src={event.user.profileImage} />
                <Chip label="Chari Rightson" color="secondary" size="small" />
              </div>
              <Typography
                variant="caption"
                className="ml-2"
                color="text.secondary"
              >
                {community}
              </Typography>
            </div>
            <Typography variant="h5">{event.title}</Typography>
            <Box className="flex w-full justify-between cursor-pointer">
              <Socials
                _id={event._id}
                type="event"
                owner={event.userId}
                likes={event.likes}
              />
              <ShareLink
                clipLink={`${window.location.origin}/events/${event._id}`}
              />
            </Box>
            <Box className="flex gap-1 items-center">
              <Typography variant="h6">Link :</Typography>
              <Typography
                variant="body2"
                component="a"
                sx={{
                  color: `${colors.indigo[500]} !important`,
                }}
                href={event.link}
              >
                {event.link}
              </Typography>
            </Box>
            <Box
              className="h-[1px]"
              bgcolor={colors.indigo[300]}
              borderRadius={1}
              width={"100%"}
            ></Box>
            <Typography variant="h6">Description</Typography>
            <Typography variant="body2">
              <Prose>
                <div dangerouslySetInnerHTML={{ __html: event.description }} />
              </Prose>
            </Typography>
            <CommentInput parent={params.event} owner={event.userId} />
          </Box>
        </Box>
        <Box mt={3} className="flex flex-col gap-2">
          <Typography variant="h5">Comments</Typography>

          {commentsLoading ? (
            Array(10)
              .fill(0)
              .map((_, i) => <CommentLoading key={i} />)
          ) : comments ? (
            <Comments comments={comments} />
          ) : (
            <Typography>No Comments yet</Typography>
          )}
        </Box>
      </Box>
    );
  }
};

export default Event;
