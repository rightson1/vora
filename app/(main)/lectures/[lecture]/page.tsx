"use client";
import React from "react";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import { useParams } from "next/navigation";
import { useGetLecture } from "@/utils/hooks/useLectures";
import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useRouter } from "next/navigation";
import { PrivateCommentInput } from "@/components/helpers/inputs";
import { useGetPcomments } from "@/utils/hooks/usePrivateComments";
import PrivateComments from "@/components/utils/PrivateComments";
import LectureLoading from "@/components/loading/LectureLoading";
import CommentsLoading from "@/components/loading/CommentsLoading";

const Lecture = () => {
  const params = useParams();
  const { colors } = useGlobalTheme();
  const { data: lecture } = useGetLecture(params.lecture);
  const { data: comments, isLoading: commentsLoading } = useGetPcomments(
    params.lecture
  );
  const { data: lecComments } = useGetPcomments(params.lecture);
  if (!lecture) return <LectureLoading />;
  return (
    <Box m={1} borderRadius={1}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              width: "100%",
              bgcolor: colors.surface,
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5">
                  {lecture.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {lecture.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className="flex justify-between items-center">
              <Button startIcon={<ChatBubbleOutlineIcon />} size="small">
                {lecComments?.length || 0}
              </Button>
              <Rating value={lecture.averageRating} precision={0.5} readOnly />
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <PrivateCommentInput parent={params.lecture} />
        </Grid>
      </Grid>
      <Box mt={3}>
        <Typography my={2} variant="h6">
          Comments
        </Typography>
        {commentsLoading ? (
          <CommentsLoading />
        ) : comments ? (
          <PrivateComments comments={comments} />
        ) : (
          <Typography variant="h6" my={2}>
            No comments yet
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Lecture;
