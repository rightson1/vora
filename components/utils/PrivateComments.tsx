import React, { useEffect, useState } from "react";
import { useGlobalTheme } from "@/utils/themeContext";
import { format } from "timeago.js";
import { CommentFetched, PrivateCommentFetched } from "@/types";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useParams, useRouter } from "next/navigation";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { CommentInput } from "../helpers/inputs";
import { motion } from "framer-motion";
import { CustomCardHeader } from "../helpers/atoms";
import MenuItem from "@mui/material/MenuItem";
import { scrollToParentComment } from "../helpers/functions";
import toast from "react-hot-toast";
import { useDeletePcomment } from "@/utils/hooks/usePrivateComments";
import { useAuth } from "@/utils/AuthContext";
const PrivateComments = ({
  comments,
}: {
  comments: PrivateCommentFetched[];
}) => {
  const { colors } = useGlobalTheme();
  const router = useRouter();
  const [commentReply, setCommentReply] = useState<number | string>("");
  const params = useParams();
  const { mutateAsync: deleteComment } = useDeletePcomment();
  const { user } = useAuth();
  const [commentsState, setCommentsState] = useState(comments);

  useEffect(() => {
    setCommentsState(comments);
  }, [comments]);

  const handleCommentDelete = (id: string) => {
    setCommentsState(
      commentsState.filter(
        (item) => item._id !== id || item.parentCommentId !== id
      )
    );
    toast.promise(
      deleteComment({
        id,
        parent: params.lecture,
      }),
      {
        loading: "Deleting comment...",
        success: "Comment deleted successfully!",
        error: "Something went wrong!",
      }
    );
  };
  return (
    <Box className="flex flex-col gap-2">
      {commentsState.map((comment, index) => {
        const parentComment = comments.find(
          (item) => item._id === comment.parentCommentId
        );
        const numberOfComments = comments.filter(
          (item) => item.parentCommentId === comment._id
        ).length;

        return (
          <>
            <Box
              bgcolor={colors.surface}
              borderRadius={1}
              className="w-full flex flex-col gap-2"
            >
              <CustomCardHeader
                createdAt={comment.createdAt}
                name={comment.name}
                profileImage={comment.name}
              >
                <MenuItem
                  disabled={comment.name !== user.fakeName}
                  onClick={() => handleCommentDelete(comment._id)}
                >
                  Delete
                </MenuItem>
              </CustomCardHeader>
              {parentComment && (
                <Box mx={1}>
                  <Button
                    onClick={() => scrollToParentComment(parentComment._id)}
                    className="flex gap-2 items-start flex-col w-full  "
                    sx={{
                      border: `2px solid ${colors.active}`,
                      borderTop: `2px solid ${colors.card}`,
                      borderLeft: `3px solid ${colors.indigo[500]}`,
                      cursor: "pointer",
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontSize="13px"
                      className="w-auto cursor-pointer"
                      fontWeight={600}
                      sx={{
                        color: colors.indigo[500],
                      }}
                    >
                      {parentComment.name}
                    </Typography>

                    <Typography variant="body1">
                      {parentComment.comment}
                    </Typography>
                  </Button>
                </Box>
              )}
              <Box p={1} className="flex gap-3 flex-col">
                <div
                  className="cursor-pointer"
                  onClick={() => router.push("/posts/1")}
                >
                  <Typography variant="body2">{comment.comment}</Typography>
                </div>
                <div className="flex items-center justify-between">
                  <Box className="flex gap-1 items-center">
                    <ChatBubbleOutlineIcon
                      sx={{
                        fontSize: "18px",
                      }}
                    />
                    <Typography variant="body2" fontSize="15px">
                      {numberOfComments > 0 ? numberOfComments : 0}
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() =>
                      setCommentReply(commentReply === index ? "" : index)
                    }
                    sx={{
                      color: colors.green[600],
                    }}
                  >
                    reply
                  </Button>
                </div>
              </Box>
            </Box>
            <motion.div
              initial={{ opacity: 0, scale: 0, height: 0 }}
              animate={{
                opacity: commentReply === index ? 1 : 0,
                scale: 1,
                height: commentReply === index ? "auto" : 0,
              }}
            >
              <CommentInput
                parent={params.lecture}
                parentCommentId={comment._id}
                owner={comment.name}
                privateComment={true}
              />
            </motion.div>
          </>
        );
      })}
    </Box>
  );
};
export default PrivateComments;
