import React from "react";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

export const LoadingCard = () => {
  return (
    <Card className="min-w-[200px]">
      <Skeleton animation="wave" variant="rectangular" height={200} />
      <CardContent>
        <Skeleton animation="wave" variant="text" width="80%" />
        <Skeleton animation="wave" variant="text" width="60%" />
        <Skeleton animation="wave" variant="text" width="40%" />
      </CardContent>
    </Card>
  );
};
export const EventLoadingCard = () => {
  return (
    <Card className="min-w-[250px]">
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circular"
            width={"40px"}
            height={"40px"}
          />
        }
        title={
          <Skeleton
            animation="wave"
            variant="text"
            width={"50%"}
            height={"30px"}
          />
        }
        subheader={
          <Skeleton
            animation="wave"
            variant="text"
            width={"30%"}
            height={"20px"}
          />
        }
      ></CardHeader>
      <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      <CardContent>
        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width="80%" />
      </CardContent>
    </Card>
  );
};
