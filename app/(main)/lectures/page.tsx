"use client";
import React from "react";
import LecRateModal from "../components/LecRateModal";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LecCard from "../components/LecCard";
import Grid from "@mui/material/Grid";
import { useRouter } from "next/navigation";
import { useGetLectures } from "@/utils/hooks/useLectures";
import LecCardLoading from "@/components/loading/LecCardLoading";

const Rate = () => {
  const { colors } = useGlobalTheme();
  const router = useRouter();
  const { data: lectures, isLoading } = useGetLectures();

  return (
    <>
      <LecRateModal
        title={"Terms And Conditions"}
        localStorageitem="rateLecNotification"
      />
      <Box m={1} my={2} bgcolor={colors.background}>
        <div className="flex items-center justify-between">
          <Typography variant="h3">Anouncements</Typography>
          <div className="flex items-center gap-4">
            <Button
              variant="contained"
              size="small"
              onClick={() => router.push("/lectures/add")}
            >
              Add Lec
            </Button>
          </div>
        </div>
        <Grid container mt={1} spacing={1}>
          {lectures ? (
            lectures.map((lec) => (
              <Grid item xs={12} sm={6}>
                <LecCard lec={lec} />
              </Grid>
            ))
          ) : isLoading ? (
            Array.from(new Array(10)).map((_, i) => (
              <Grid item xs={12} sm={6}>
                <LecCardLoading />
              </Grid>
            ))
          ) : (
            <Typography variant="h3">No Lectures Added</Typography>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default Rate;
