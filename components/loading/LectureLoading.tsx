import React from "react";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import { useParams } from "next/navigation";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  Button,
  Rating,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Skeleton from "@mui/material/Skeleton";

const LectureLoading = () => {
  const { colors } = useGlobalTheme();

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
              <Skeleton animation="wave" variant="rectangular" height={200} />
              <CardContent>
                <Skeleton animation="wave" variant="text" />
                <Skeleton animation="wave" variant="text" width={200} />
              </CardContent>
            </CardActionArea>
            <CardActions className="flex justify-between items-center">
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box component="form" className="flex flex-col gap-3">
            <Typography variant="h6">Comment</Typography>
            <div className="form-control">
              <label>Comment</label>
              <Skeleton animation="wave" variant="rectangular" height={80} />
            </div>
            <div className="form-control">
              <label>Rate</label>
              <Skeleton
                animation="wave"
                variant="rectangular"
                width={100}
                height={40}
              />
            </div>
            <Button className="w-fit" variant="contained">
              Comment
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LectureLoading;
