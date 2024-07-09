import { Box, Typography, Avatar, Skeleton } from "@mui/material";

const ProfileLoading = () => {
  return (
    <Box
      className="w-full flex gap-2 items-center shadow-lg"
      p={1}
      borderBottom={1}
      borderColor="grey.300" // Replace with your desired border color
    >
      <Avatar variant="square">
        <Skeleton variant="rectangular" width={40} height={40} />
      </Avatar>
      <div className="flex-col-start w-full">
        <Typography variant="h6" className="w-full">
          <Skeleton width={200} />
        </Typography>
        <div className="fb w-full">
          <Typography variant="body2">
            <Skeleton width={50} />
          </Typography>
          <Typography variant="body2">
            <Skeleton width={50} />
          </Typography>
        </div>
      </div>
    </Box>
  );
};

export default ProfileLoading;
