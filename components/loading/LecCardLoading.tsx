import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Skeleton } from "@mui/material";

export default function LecCardLoading() {
  return (
    <Card
      sx={{
        width: "100%",
      }}
    >
      <CardActionArea>
        <Skeleton
          animation="wave"
          variant="rectangular"
          width={"100%"}
          height={200}
        />
        <CardContent>
          <Skeleton animation="wave" variant="text" width={200} />
          <Skeleton animation="wave" variant="text" width={300} />
        </CardContent>
      </CardActionArea>
      <CardActions className="flex justify-between items-center">
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
        <Skeleton animation="wave" variant="circular" width={40} height={40} />
      </CardActions>
    </Card>
  );
}
