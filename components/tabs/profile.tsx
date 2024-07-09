import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Button from "@mui/material/Button";
import { Post, SocialIcons } from "../helpers/atoms";
import { PostFetched, User } from "@/types";
import { useGetCommunityPosts, useGetPosts } from "@/utils/hooks/usePosts";
import { useParams } from "next/navigation";
import Posts from "../utils/Posts";
const Profile = ({
  bio,
  blogs,
  isLoading,
}: {
  bio?: string;
  blogs?: PostFetched[];
  isLoading: boolean;
}) => {
  const { colors } = useGlobalTheme();

  return (
    <Grid container>
      <Grid
        item
        xs={12}
        lg={4}
        mb={0.5}
        pr={{
          xs: 0,
          lg: 1,
        }}
      >
        <Box
          bgcolor={colors.surface}
          p={1}
          borderRadius={1}
          className="space-y-1 md:sticky md:top-[70px]"
        >
          <Typography variant="h4">Bio</Typography>
          <div className=" prose text-white prose-p:text-white prose-ul:text-white prose-a:text-blue-600 prose-headings:text-white  prose-blockquote:text-white prose-strong:text-white prose-em:text-white">
            {bio ? (
              <div dangerouslySetInnerHTML={{ __html: bio }}></div>
            ) : (
              <Typography variant="body2">No bio</Typography>
            )}
          </div>
          {/* mail chari.rightson@gmail.com  whatsap 0791568168*/}
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        lg={8}
        my={{
          xs: 0.5,
          lg: 0,
        }}
        className="space-y-2"
      >
        <Posts blogs={blogs} isLoading={isLoading} />
      </Grid>
    </Grid>
  );
};

export default Profile;
