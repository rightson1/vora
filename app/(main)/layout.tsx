"use client";
import React, { useEffect, useState } from "react";
import { childrenProps } from "@/types";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import CustomSpeedDial from "@/components/utils/CustomSpeedDial";
import { useAuth } from "@/utils/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { useGlobalTheme } from "@/utils/themeContext";
import SidebarLoading from "./components/SidebarLoading";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import CardHeader from "@mui/material/CardHeader";
import BottomBar from "./components/BottomBar";

const Layout = ({ children }: childrenProps) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const screenWidth = useMediaQuery(theme.breakpoints.up("md"));
  const { admin, user } = useAuth();
  const pathname = usePathname();
  const { colors } = useGlobalTheme();
  const router = useRouter();
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    const data = localStorage.getItem("path");
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!admin) {
      localStorage.setItem("path", pathname);
      router.push("/login");
    }
  }, [admin, user]);
  const skeletonItemsCount = 5; // Adjust the number of loading items

  if (!user || !loaded) {
    return (
      <div className="flex gap-1">
        <SidebarLoading />
        <div className="flex-col flex flex-1 gap-5">
          <Box
            bgcolor={colors.surface}
            className="h-[64px] w-full flex justify-between items-center px-2"
          >
            <div className="flex gap-2 ">
              {[1, 2].map((item, index) => (
                <div className="flex gap-1" key={index}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    height="30px"
                    width="20px"
                  />
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    height="30px"
                    width="60px"
                    className="flex-1"
                  />
                </div>
              ))}
            </div>

            <div className="flex">
              <Skeleton
                animation="wave"
                variant="rectangular"
                height="30px"
                width="20px"
                className="flex-1"
              />
            </div>
          </Box>
          <Box className="flex flex-col gap-2  px-2 md:px-0">
            {[...Array(skeletonItemsCount)].map((_, index) => (
              <Box key={index}>
                <Card>
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
                  <Skeleton
                    sx={{ height: 190 }}
                    animation="wave"
                    variant="rectangular"
                  />
                  <CardContent>
                    <Skeleton
                      animation="wave"
                      height={10}
                      style={{ marginBottom: 6 }}
                    />
                    <Skeleton animation="wave" height={10} width="80%" />
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </div>

        <Box
          className="hidden  w-[200px] md:flex flex-col p-2 gap-10"
          bgcolor={colors.surface}
        >
          <div className="flex items-center justify-between ">
            <Skeleton
              animation="wave"
              variant="rectangular"
              height="30px"
              width="50px"
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              height="30px"
              width="50px"
            />
          </div>
          <div className="flex flex-col gap-2 items-center justify-center">
            <Skeleton
              animation="wave"
              variant="circular"
              height="100px"
              width="100px"
            />{" "}
            <Skeleton
              animation="wave"
              variant="rectangular"
              height="20px"
              width="100%"
            />
            <Skeleton
              animation="wave"
              variant="rectangular"
              height="10px"
              width="50%"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton
              animation="wave"
              variant="rectangular"
              height="20px"
              width="50%"
            />
            <div className="flex flex-col gap-3">
              {Array(5)
                .fill(5)
                .map((item, index) => (
                  <div className="flex gap-1 flex-1 items-center" key={index}>
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      height="50px"
                      width="50px"
                    />
                    <Skeleton
                      animation="wave"
                      variant="rectangular"
                      height="50px"
                      width="100%"
                      className="flex-1"
                    />
                  </div>
                ))}
            </div>
          </div>
        </Box>
      </div>
    );
  }

  return (
    <Box>
      <Sidebar {...{ open, setOpen }} />
      <Navbar {...{ open, setOpen }} />
      <Box
        sx={{
          mt: "70px",
          ml: screenWidth ? "220px" : 0,
          mr: screenWidth ? "240px" : 0,
        }}
      >
        {children}
      </Box>
      <BottomBar />
      <Rightbar />
      <CustomSpeedDial />
    </Box>
  );
};

export default Layout;
