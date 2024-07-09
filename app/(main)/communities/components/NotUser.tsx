import { CommunityFetched } from "@/types";
import { useGlobalTheme } from "@/utils/themeContext";
import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Avatar } from "@mui/material";
import { SocialButtons } from "@/components/helpers/atoms";
import { Prose } from "@/components/helpers/molecules";
import { useAddCommunityMember } from "@/utils/hooks/useCommunity";
import { useAuth } from "@/utils/AuthContext";
import { addNotification } from "@/utils/hooks/useNotification";
import toast from "react-hot-toast";
const NotUser = ({
  community,
  setOnTour,
}: {
  community: CommunityFetched;
  setOnTour: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { colors } = useGlobalTheme();
  const {
    user: { _id, name, profileImage },
  } = useAuth();
  const communityAdmin = community.users.find((user) => user.role === "admin");
  const { mutateAsync: addMember } = useAddCommunityMember();
  const communityAdmins = community.users.filter(
    (user) => user.role === "admin"
  );
  const handleJoin = () => {
    const add = async () => {
      await addMember({
        communityId: community._id,
        userId: _id,
        role: "member",
        status: "pending",
      });
      await Promise.all(
        communityAdmins.map(async (admin) => {
          await addNotification({
            sender: _id,
            receiver: admin._id,
            title: `${name} requested to join ${community.title}`,
            link: `/communities/${community._id}`,
          });
        })
      );
    };
    toast.promise(add(), {
      loading: "Sending request...",
      success: () => "Request sent",
      error: () => "Error sending request",
    });
  };
  return (
    <Box bgcolor={colors.surface} p={1}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <img
            src={community.profileImage}
            alt={community.title}
            className="w-full h-[300px] sm:h-[400px] object-cover"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="flex justify-between">
            <Typography variant="h4" className="mr-2">
              {community.title}
            </Typography>
            <Button
              variant="contained"
              size="small"
              color="info"
              onClick={handleJoin}
            >
              Join
            </Button>
          </div>
          <div className="flex flex-col w-auto">
            <Button
              variant="contained"
              size="small"
              color="info"
              className="my-1 w-fit"
              onClick={() => {
                if (community.visibility === "public") {
                  setOnTour(true);
                }
              }}
            >
              {community.visibility === "private"
                ? "Private Community"
                : "View Community"}
            </Button>
            <Button size="small" className="my-1 w-fit">
              {community.users.length} Members
            </Button>
          </div>
          {communityAdmin && (
            <Box
              borderRadius={1}
              bgcolor={colors.card}
              p={1}
              className="flex gap-5"
            >
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                }}
                src={communityAdmin.profileImage}
                alt={communityAdmin.name}
              />
              <div className="flex-col">
                <Typography variant="body2">Admin</Typography>
                <Typography variant="h6">{communityAdmin.name}</Typography>
              </div>
            </Box>
          )}
          <SocialButtons links={community.links} />
          <Typography variant="h6" className="mt-2">
            Description
          </Typography>
          <Prose>
            {community.description ? (
              <div
                dangerouslySetInnerHTML={{ __html: community.description }}
              ></div>
            ) : (
              <Typography variant="body2">No description</Typography>
            )}
          </Prose>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NotUser;
