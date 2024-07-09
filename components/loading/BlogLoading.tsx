import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";

const BlogLoading = () => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
        }
        title={<Skeleton animation="wave" height={10} width="80%" />}
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
      <Skeleton variant="rectangular" height={200} />
      {/* Rest of your card content */}
    </Card>
  );
};
export default BlogLoading;
