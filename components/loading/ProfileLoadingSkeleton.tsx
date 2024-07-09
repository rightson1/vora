import React from "react";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";

const ProfileLoadingSkeleton = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Skeleton
              animation="pulse"
              variant="rectangular"
              height={200}
              style={{ marginBottom: "16px" }}
            />
            <Avatar
              sx={{ width: 100, height: 100, margin: "0 auto" }}
              alt="User Avatar"
            >
              <Skeleton
                animation="pulse"
                variant="circular"
                width={100}
                height={100}
              />
            </Avatar>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <Skeleton
              animation="pulse"
              variant="rectangular"
              height={200}
              style={{ marginBottom: "16px" }}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={8}>
        <Card>
          <CardContent>
            <Skeleton
              animation="pulse"
              variant="rectangular"
              height={200}
              style={{ marginBottom: "16px" }}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfileLoadingSkeleton;
