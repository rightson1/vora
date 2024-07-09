import { useRouter } from "next/navigation";
import React from "react";
import { useAuth } from "@/utils/AuthContext";
import { useGlobalTheme } from "@/utils/themeContext";
import { toast } from "react-hot-toast";
import { CustomCardHeader, ShareLink } from "../helpers/atoms";
import Card from "@mui/material/Card";
import MenuItem from "@mui/material/MenuItem";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import { useGetCommunities } from "@/utils/hooks/useCommunity";
import { PostFetched } from "@/types";
import { useDeletePost, useLikePost } from "@/utils/hooks/usePosts";
import { useIsCommunityUser } from "../helpers/functions";
import Socials from "../utils/Socials";

const Blog = ({ post }: { post: PostFetched }) => {
  const { colors } = useGlobalTheme();
  const router = useRouter();
  const { data: communities } = useGetCommunities();
  const community = communities?.find((i) => i._id === post.communityId);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { user } = useAuth();
  const { mutateAsync: deletePost } = useDeletePost();
  const { mutateAsync: likePost } = useLikePost();
  const [liked, setLiked] = React.useState(
    post.likes.find((i) => i === user._id) || false
  );
  const admin =
    useIsCommunityUser("admin", post.communityId) || post.userId === user._id;

  const handleClick = (post: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(post.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePostDelete = async () => {
    console.log("delete");
    toast.promise(deletePost(post._id), {
      loading: "Deleting post...",
      success: "Post deleted successfully",
      error: "Error deleting post",
    });
  };
  const handleLike = async () => {
    setLiked(!liked);
    await likePost({
      id: post._id,
      userId: user._id,
    });
  };

  return (
    <Card
      className="w-full cursor-pointer"
      onClick={() => router.push("/posts/" + post._id)}
    >
      <CustomCardHeader
        createdAt={post.createdAt}
        name={post.user.name}
        link={"/profile/" + post.userId}
        profileImage={post.user.profileImage}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            router.push("/profile/" + post.userId);
          }}
        >
          Profile
        </MenuItem>
        {admin && (
          <>
            <MenuItem onClick={handlePostDelete}>Delete</MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                router.push("/posts/" + post._id + "/edit");
              }}
            >
              Edit
            </MenuItem>
          </>
        )}
      </CustomCardHeader>
      <CardMedia
        component="img"
        sx={{
          height: {
            xs: "250px",
            sm: "196px",
          },
          objectFit: "cover",
        }}
        image={post.coverImage}
        alt="cover image"
      />

      <CardContent className="rounded-lg shadow-md p-4">
        <div className="flex flex-col gap-2">
          <Typography variant="h6" className="text-xl font-semibold">
            {post.title}
          </Typography>
          <div className="flex w-full justify-between items-center">
            <Chip
              label={community ? community.title : "School"}
              className="bg-secondary text-white py-1 px-2 rounded-full text-sm"
            />
            <Chip
              label={post.views.find((i) => i === user._id) ? "Read" : "Unread"}
              className={`py-1 px-2 text-sm`}
              sx={{
                backgroundColor: post.views.find((i) => i === user._id)
                  ? colors.green[500]
                  : colors.indigo[500],
              }}
            />
          </div>
        </div>
      </CardContent>

      <CardActions
        disableSpacing
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex w-full justify-between items-center"
      >
        <Socials
          {...{
            likes: post.likes,
            type: "post",
            _id: post._id,
            owner: post.userId,
            ownerName: post.user.name,
          }}
        />
        <ShareLink clipLink={`${window.location.origin}/posts/${post._id}`} />
      </CardActions>
    </Card>
  );
};
export default Blog;
