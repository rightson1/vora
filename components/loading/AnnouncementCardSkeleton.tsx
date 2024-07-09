import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";

function AnnouncementCardSkeleton() {
  return (
    <Box
      bgcolor="background.paper" // Use your preferred background color
      borderRadius={1}
      className="space-y-2 cursor-pointer"
    >
      <Box p={1} className="flex justify-between items-center ">
        <Box className="flex gap-2 items-center">
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width={150} height={40} />
        </Box>
        <Skeleton variant="text" width={120} height={20} />
        <IconButton>
          <MoreHorizIcon sx={{ fontSize: "20px" }} />
        </IconButton>
      </Box>
      <Skeleton variant="rectangular" width="100%" height={300} />
      <Box p={1} className="">
        <div className="cursor-pointer">
          <Skeleton variant="text" width="80%" height={40} />
        </div>
        <div className="flex w-full justify-between mt-2 items-center ">
          <Skeleton variant="text" width={100} height={30} />
          <Button variant="contained" size="small">
            Hide
          </Button>
        </div>
        <Skeleton variant="text" width="100%" height={100} />
      </Box>
    </Box>
  );
}

export default AnnouncementCardSkeleton;
