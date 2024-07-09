"use client";
import { useGlobalTheme } from "@/utils/themeContext";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Announcement } from "@/components/helpers/atoms";
import { useGetAnnouncements } from "@/utils/hooks/useAnnouncements";
import BEALoading from "@/components/loading/BEALoading";
import { AnnouncementFetched } from "@/types";
import Button from "@mui/material/Button";
import AnnouncementCardSkeleton from "@/components/loading/AnnouncementCardSkeleton";
import { useAuth } from "@/utils/AuthContext";
import Title from "../components/Title";

const Anouncements = () => {
  const { colors } = useGlobalTheme();
  const [viewStatus, setViewStatus] = React.useState(true);
  const { data, isLoading } = useGetAnnouncements();
  const { user } = useAuth();
  const [hiddenAnnouncements, setHiddenAnnouncements] = React.useState<
    string[]
  >([]);
  const [announcements, setAnnouncements] = React.useState<
    AnnouncementFetched[]
  >([]);
  useEffect(() => {
    if (user) {
      //hiddenAnnouncements(where user._id == announcement.views)
      const hidden = data?.filter((_) =>
        _.views?.some((view) => view === user._id)
      );
      if (hidden) {
        const hiddenIds = hidden.map((_) => _._id);
        setHiddenAnnouncements(hiddenIds);
      }
    }
  }, [data]);
  useEffect(() => {
    if (data) {
      //filter out hidden announcements
      if (viewStatus) {
        const filteredAnnouncements = data.filter(
          (_) => !hiddenAnnouncements.includes(_._id)
        );
        setAnnouncements(filteredAnnouncements);
      } else {
        setAnnouncements(data);
      }
    }
  }, [data, hiddenAnnouncements, viewStatus]);

  return (
    <Box p={1} mb={4} className="space-y-2">
      <Title title="Announcements" />
      <div className="flex justify-between items-center">
        <Typography variant="h3">Anouncements</Typography>
        <div className="flex items-center gap-4">
          <Button
            variant="contained"
            onClick={() => setViewStatus(true)}
            sx={{
              backgroundColor: viewStatus
                ? colors.indigo[500]
                : colors.indigo[800],
            }}
            size="small"
          >
            New
          </Button>
          <Button
            onClick={() => setViewStatus(false)}
            variant="contained"
            size="small"
            sx={{
              backgroundColor: !viewStatus
                ? colors.indigo[500]
                : colors.indigo[800],
            }}
          >
            All
          </Button>
        </div>
      </div>
      {isLoading ? (
        <AnnouncementCardSkeleton />
      ) : announcements ? (
        announcements.map((_, i) => (
          <Announcement
            key={i}
            announcement={_}
            status={viewStatus}
            setHiddenAnnouncements={setHiddenAnnouncements}
          />
        ))
      ) : (
        !isLoading &&
        !announcements && <Typography variant="h4">No Announcements</Typography>
      )}
    </Box>
  );
};

export default Anouncements;
