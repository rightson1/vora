"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import { Post } from "@/components/helpers/atoms";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useGlobalTheme } from "@/utils/themeContext";
import { useGetPosts } from "@/utils/hooks/usePosts";
import Blog from "@/components/blog";
import Button from "@mui/material/Button";
import { useAuth } from "@/utils/AuthContext";
import { PostFetched } from "@/types";
import Posts from "@/components/utils/Posts";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export default function VerticalTabs() {
  const { data: blogs, isLoading } = useGetPosts();
  return (
    <Box m={1} py={2}>
      <Posts blogs={blogs} isLoading={isLoading} />
    </Box>
  );
}
