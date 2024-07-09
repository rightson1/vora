import { useAuth } from "@/utils/AuthContext";
import { useLikeEvent } from "@/utils/hooks/useEvents";
import { useLikePost } from "@/utils/hooks/usePosts";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useCommentCount } from "@/utils/hooks/useComments";
import { addNotification } from "@/utils/hooks/useNotification";

export default function Socials({
  _id,
  likes,
  type,
  owner,
  ownerName,
}: {
  _id: string;
  likes: string[];
  type: "event" | "post";
  owner: string;
  ownerName?: string;
}) {
  const [liked, setLiked] = useState(false);
  const { mutateAsync: likeEvent } = useLikeEvent();
  const { mutateAsync: likePost } = useLikePost();
  const [likesLength, setLikesLength] = useState(likes.length);
  const { data: commentsCount } = useCommentCount(_id);

  const { user } = useAuth();

  const handleLike = async () => {
    setLiked(!liked);

    try {
      if (type === "event") {
        await likeEvent({
          id: _id,
          userId: user._id,
        });
      } else {
        await likePost({
          id: _id,
          userId: user._id,
        });
      }
      if (!likes.includes(user._id)) {
        await addNotification({
          sender: user._id,
          receiver: owner,
          title: `${user.name} liked your ${type}`,
          link: `/${type}s/${_id}`,
        });
      }

      // Update the likes length after a successful like/unlike
      setLikesLength(liked ? likesLength - 1 : likesLength + 1);
    } catch (error) {
      console.error("Error liking/unliking:", error);
    }
  };

  useEffect(() => {
    // Check if the user has already liked the event/post
    if (likes.includes(user._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [likes, user._id]);

  return (
    <div className="flex items-center gap-2">
      <IconButton
        className="flex gap-1"
        aria-label="add to favorites"
        onClick={handleLike}
      >
        {liked ? (
          <FavoriteIcon sx={{ color: "red" }} />
        ) : (
          <FavoriteBorderIcon />
        )}
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {likesLength}
        </Typography>
      </IconButton>
      <IconButton className="flex items-center gap-1" aria-label="comment">
        <ChatBubbleOutlineIcon
          sx={{
            fontSize: "1.2rem",
          }}
        />
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {commentsCount || 0}
        </Typography>
      </IconButton>
    </div>
  );
}
