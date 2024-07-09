import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
  ListItemText,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemButton,
  Chip,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import { useGlobalTheme } from "@/utils/themeContext";
import { db } from "@/utils/firebase";
import { doc, deleteDoc } from "@firebase/firestore";
import { Toaster, toast } from "react-hot-toast";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { useAuth } from "@/utils/AuthContext";
import { NotificationFetched } from "@/types";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";
const NotificationsList = ({
  notifications,
  setNotifications,
}: {
  notifications: NotificationFetched[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationFetched[]>>;
}) => {
  const { user } = useAuth();
  const { colors } = useGlobalTheme();
  const router = useRouter();

  const handleRead = async (item: NotificationFetched) => {
    try {
      await deleteDoc(doc(db, "notifications", item.id));
      toast.success("Notification deleted successfully");
    } catch (error) {
      toast.error("Failed to delete notification");
    }
  };

  return (
    <List>
      {notifications.length > 0 ? (
        <Box className="mb-4">
          <ListItem className="border-b border-gray-300">
            <ListItemText
              primary="Notifications"
              primaryTypographyProps={{
                className: "text-lg font-semibold",
              }}
            />
          </ListItem>
          <Box p={1}>
            {notifications.map((item) => (
              <ListItemButton
                onClick={() => router.push(item.link)}
                sx={{
                  bgcolor: colors.surface,
                  borderBottom: `1px solid ${colors.indigo[500]}`,
                  "&:hover": {
                    bgcolor: `${colors.card} !important`,
                  },
                }}
                key={item.id}
                className="border-b cursor-pointer p-1 w-[250px] gap-2 border-gray-300 shadow-lg flex flex-col "
              >
                <Typography className="text-sm font-semibold w-full text-left">
                  {item.title}
                </Typography>
                <div className="flex w-full justify-end">
                  <Button
                    size="small"
                    onClick={() => handleRead(item)}
                    variant="contained"
                  >
                    <DeleteIcon
                      color="error"
                      sx={{
                        fontSize: "1.3rem",
                        color: colors.red[500],
                      }}
                    />
                  </Button>
                </div>
              </ListItemButton>
            ))}
          </Box>
        </Box>
      ) : (
        <Typography
          variant="body2"
          p={1}
          sx={{
            color: colors.textSecondary,
          }}
        >
          No Notifications
        </Typography>
      )}
    </List>
  );
};

export default NotificationsList;
