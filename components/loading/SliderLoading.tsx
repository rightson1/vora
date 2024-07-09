import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const SliderLoading = () => {
  return (
    <Box
      sx={{
        borderRadius: 1,
        width: "100%",
        height: "500px",
        mb: 2,
      }}
    >
      <Skeleton
        variant="rectangular"
        height={300}
        animation="wave"
        sx={{ borderRadius: "borderRadius" }}
      />
      <Box p={2}>
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" width={200} />
      </Box>
    </Box>
  );
};

export default SliderLoading;
