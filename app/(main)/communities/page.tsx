"use client";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import { Grid, Skeleton } from "@mui/material";
import { useGlobalTheme } from "@/utils/themeContext";
import { clubs } from "@/constants";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardScroll } from "@/components/helpers/atoms";
import { useRouter } from "next/navigation";
import { useGetCommunities } from "@/utils/hooks/useCommunity";
import { useAuth } from "@/utils/AuthContext";
import { CommunityFetched } from "@/types";
import Title from "../components/Title";

const Communities = () => {
  const { colors } = useGlobalTheme();
  const router = useRouter();
  const { data: communities, isLoading } = useGetCommunities();
  const { user, communitiesIn } = useAuth();

  return (
    <Box p={1} className="flex flex-col gap-5">
      <Title title="Vora Communities" />
      <Typography variant="h5">Your Communities</Typography>
      <Grid container spacing={2} mb={5}>
        {isLoading ? (
          [1, 2, 3, 4].map((item, i) => (
            <Grid item xs={12} md={6} className="" key={i}>
              <Skeleton
                variant="rectangular"
                width="100%"
                height="50px"
                className="rounded-xl"
              />
            </Grid>
          ))
        ) : communities ? (
          communitiesIn.map((community, i) => (
            <Grid
              item
              xs={12}
              md={6}
              className=""
              key={i}
              onClick={() => router.push("/communities/" + community._id)}
            >
              <Box
                borderRadius={1}
                className="flex items-center cursor-pointer gap-2  overflow-hidden"
                bgcolor={colors.card}
                sx={{
                  "&:hover": {
                    bgcolor: colors.active,
                  },
                }}
              >
                <Image
                  src={community.profileImage}
                  alt={community.title}
                  height={500}
                  className="h-[60px] w-[60px] "
                  width={500}
                />
                <Typography variant="h5">{community.title}</Typography>
              </Box>
            </Grid>
          ))
        ) : (
          <Box className="h-[200px]">
            <Typography variant="h5">
              Your communities will apper here
            </Typography>
          </Box>
        )}
      </Grid>

      <CardScroll title="Discover Communities">
        {isLoading ? (
          Array(10)
            .fill(0)
            .map((item, index) => (
              <Card key={index} className="min-w-[200px]">
                <Skeleton animation="wave" variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton animation="wave" variant="text" width="80%" />
                  <Skeleton animation="wave" variant="text" width="60%" />
                  <Skeleton animation="wave" variant="text" width="40%" />
                </CardContent>
              </Card>
            ))
        ) : communities ? (
          communities.map((item, index) => {
            return (
              <Card
                sx={{ width: 305 }}
                onClick={() => router.push("/communities/" + item._id)}
                className="min-w-[200px] cursor-pointer max-w-[200px]"
              >
                <CardMedia
                  sx={{ height: 140 }}
                  image={item.profileImage}
                  title={item.title}
                  key={index}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="opacity-90"
                  ></Typography>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Typography variant="h5">No Communities</Typography>
        )}
      </CardScroll>
    </Box>
  );
};

export default Communities;
