"use client";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import ShareIcon from "@mui/icons-material/Share";
import Image from "next/image";
import { SocialIcons } from "@/components/helpers/atoms";
import IconButton from "@mui/material/IconButton";
import { CommentInput } from "@/components/helpers/inputs";
import { useAddView, useGetPosts } from "@/utils/hooks/usePosts";
import { useParams } from "next/navigation";
import BEALoading from "@/components/loading/BEALoading";
import { useGetCommunities } from "@/utils/hooks/useCommunity";
import { Prose } from "@/components/helpers/molecules";
import { useGetComments } from "@/utils/hooks/useComments";
import CommentLoading from "@/components/loading/CommentsLoading";
import Comments from "@/components/utils/Comments";
import Button from "@mui/material/Button";
import { useIsCommunityUser } from "@/components/helpers/functions";
import { useAuth } from "@/utils/AuthContext";
import { useRouter } from "next/navigation";
import Socials from "@/components/utils/Socials";

const Post = () => {
  const { colors } = useGlobalTheme();
  const { data: posts, isLoading } = useGetPosts();
  const params = useParams();
  const router = useRouter();
  const [community, setCommunity] = React.useState("");
  const post = posts?.find((item) => item._id === params.post);
  const { data: communities } = useGetCommunities();
  const isAdmin = useIsCommunityUser("admin", post?.communityId);
  const { user } = useAuth();
  const [editButton, setEditButton] = React.useState(false);
  const { data: comments, isLoading: commentsLoading } = useGetComments(
    params.post
  );
  const { mutateAsync: addView } = useAddView();

  useEffect(() => {
    if (post) {
      const community = communities?.find(
        (item) => item._id === post?.communityId
      );
      community && setCommunity(community?.title);
      setEditButton(isAdmin || post.userId === user?._id);
      //addView if user._id does not exist in post.views
    }
  }, [post, communities]);
  useEffect(() => {
    if (post && !post.views.includes(user?._id)) {
      addView({ id: post._id, userId: user?._id });
    }
  }, [post]);

  if (isLoading) return <BEALoading />;

  if (post) {
    return (
      <Box m={1}>
        <Box
          borderRadius={1}
          bgcolor={colors.surface}
          className="overflow-hidden"
        >
          <div className="relative">
            <Image
              src={post?.coverImage}
              width={1000}
              height={1000}
              alt={post?.title}
              className="w-full h-[300px] object-cover "
            />

            {editButton && (
              <Button
                disabled={!isAdmin}
                variant="contained"
                className="absolute top-2 right-2"
                size="small"
                onClick={() => router.push(`/posts/${post._id}/edit`)}
              >
                Edit
              </Button>
            )}
          </div>

          <Box p={1} className="space-y-3">
            <div className="flex items-center justify-between cursor-pointer">
              <div
                className="space-y-2"
                onClick={() => router.push(`/profile/${post.userId}`)}
              >
                <Avatar alt={post.user.name} src={post.user.profileImage} />
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
            <Box className="flex w-full justify-between">
              <Socials
                _id={post._id}
                type="post"
                owner={post.userId}
                likes={post.likes}
              />
              <IconButton>
                <ShareIcon />
              </IconButton>
            </Box>
            <Typography variant="h5">{post.title}</Typography>

            <Box
              className="h-[1px]"
              bgcolor={colors.indigo[300]}
              borderRadius={1}
              width={"100%"}
            ></Box>
            <Typography variant="h6">Description</Typography>
            <Typography variant="body2">
              <Prose>
                <div dangerouslySetInnerHTML={{ __html: post.description }} />
              </Prose>
            </Typography>
            <CommentInput parent={params.post} owner={post.userId} />
          </Box>
        </Box>
        <Box mt={3} className="flex flex-col gap-2">
          <Typography variant="h5">Comments</Typography>

          {commentsLoading ? (
            Array(10)
              .fill(0)
              .map((_, i) => <CommentLoading key={i} />)
          ) : comments && comments.length > 0 ? (
            <Comments comments={comments} />
          ) : (
            <Typography mb={10}>No Comments yet</Typography>
          )}
        </Box>
      </Box>
    );
  }
};

export default Post;
