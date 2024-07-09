import { useGlobalTheme } from "@/utils/themeContext";
import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const SidebarLoading = () => {
  const { colors } = useGlobalTheme();
  return (
    <Box
      width="200px"
      height="100vh"
      className="p-1 flex-col py-5  gap-5 hidden md:flex"
      bgcolor={colors.surface}
    >
      <Skeleton
        animation="wave"
        variant="rectangular"
        height="70px"
        width="100%"
      />
      <div className="flex flex-col gap-7">
        {Array(2)
          .fill(10)
          .map((_i, index) => {
            return (
              <div className="flex flex-col gap-3 w-full " key={index}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  height="20px"
                  width="50%"
                />
                <div className="flex flex-col gap-5 w-full">
                  {Array(5)
                    .fill(0)
                    .map((item, index) => (
                      <div className="flex gap-3" key={index}>
                        <div className="flex gap-1 flex-1">
                          <Skeleton
                            animation="wave"
                            variant="rectangular"
                            height="20px"
                            width="20px"
                          />
                          <Skeleton
                            animation="wave"
                            variant="rectangular"
                            height="20px"
                            width="100%"
                            className="flex-1"
                          />
                        </div>
                        <Skeleton
                          animation="wave"
                          variant="rectangular"
                          height="20px"
                          width="20px"
                        />
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
      </div>
    </Box>
  );
};

export default SidebarLoading;
