import React from "react";
import { Container, Typography, Grid, Skeleton, Card } from "@mui/material";

const FormLoading = () => {
  return (
    <Card
      sx={{
        m: 0.5,
      }}
      variant="outlined"
      style={{ padding: "16px" }}
    >
      <div className="flex items-center justify-between">
        <Skeleton variant="text" height={24} animation="wave" width={100} />
        <Skeleton
          variant="rectangular"
          height={24}
          animation="wave"
          width={50}
        />
      </div>
      <Grid container spacing={2}>
        {Array.from(new Array(8)).map((_, index) => (
          <Grid item xs={12} key={index}>
            <Skeleton
              variant="text"
              height={24}
              width={"40%"}
              animation="wave"
            />
            <Skeleton
              variant="rectangular"
              height={index % 2 === 0 ? 100 : 50}
              animation="wave"
            />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
};

export default FormLoading;
