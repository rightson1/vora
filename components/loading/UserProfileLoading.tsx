import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useGlobalTheme } from "@/utils/themeContext";

const UserProfileLoading = () => {
  const { colors } = useGlobalTheme();
  return (
    <Box
      m={1}
      borderRadius={1}
      className="overflow-hidden"
      bgcolor={colors.surface}
    >
      <div className="relative">
        <Skeleton
          variant="rectangular"
          height={200}
          animation="wave"
          width="100%"
        />
        <div className="flex flex-col items-center -bottom-20 left-1/2 translate-x-[-50%] absolute">
          <Skeleton
            variant="circular"
            width={80}
            height={80}
            animation="wave"
          />
          <Box className="flex-col items-center justify-center w-full ">
            <Skeleton variant="text" width={120} height={30} animation="wave" />
            <Skeleton variant="text" width={100} height={20} animation="wave" />
          </Box>
        </div>
      </div>

      <Grid
        container
        sx={{
          mt: 10,
        }}
        p={1}
        spacing={2}
      >
        {/* first on large screen second on small */}
        <Grid item xs={12} lg={8} className="flex justify-between px-4 ">
          {[1, 2, 3].map((item, index) => (
            <div className="flex-col items-center" key={index}>
              <Button className="flex flex-col">
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  width={80}
                  height={20}
                  animation="wave"
                />
                <Skeleton
                  variant="text"
                  width={60}
                  height={16}
                  animation="wave"
                />
              </Button>
            </div>
          ))}
        </Grid>
        {/* the Grid item below should come first when in xs */}

        {/* should come last always */}
        <Grid
          item
          xs={12}
          lg={4}
          className="flex gap-2 justify-center items-center lg:justify-end md:w-full "
        >
          <Skeleton
            variant="rectangular"
            width="70%"
            height={40}
            animation="wave"
          />
        </Grid>
      </Grid>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }} pb={0.2}>
        <Tabs value={0} onChange={() => {}} centered>
          {[1, 2, 3].map((item, index) => (
            <Tab label="" key={index} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};

export default UserProfileLoading;
