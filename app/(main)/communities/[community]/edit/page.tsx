"use client";
import React, { use, useEffect } from "react";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import Typography from "@mui/material/Typography";
import DraftsIcon from "@mui/icons-material/Drafts";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Editor from "@/components/utils/Editor";
import { ImageField } from "@/components/helpers/inputs";
import toast from "react-hot-toast";
import { deleteFile, uploadFile } from "@/components/helpers/functions";
import { CommunityFetched, LinkType } from "@/types";
import { useAuth } from "@/utils/AuthContext";
import { SelectSocialLinks } from "@/components/helpers/atoms";
import {
  useAddCommunity,
  useEditCommunity,
  useGetCommunities,
} from "@/utils/hooks/useCommunity";
import { useParams } from "next/navigation";
import FormLoading from "@/components/loading/FormLoading";
const NewCommunity = () => {
  const { colors } = useGlobalTheme();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [links, setLinks] = useState<LinkType[]>([]);
  const params = useParams();
  const { data, isLoading } = useGetCommunities();
  const [visibility, setVisibility] = useState<"private" | "public">("public");
  const [community, setCommunity] = React.useState<CommunityFetched | null>(
    null
  );
  const { mutateAsync: editCommunity } = useEditCommunity();
  useEffect(() => {
    if (data) {
      const community = data.find((item) => item._id === params.community);
      if (community) {
        setCommunity(community);
        setVisibility(community.visibility);
        setTitle(community.title);
      }
    }
  }, [data]);

  const draft = () => {
    localStorage.setItem("title", title);
    localStorage.setItem("description", description);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!community) return;
    const communityUpdate = {
      title,
      description,
      visibility,
      links,
      profileImage: community.profileImage,
      coverImage: community.coverImage,
    };
    const update = async () => {
      const imageUpdate = async (
        profileImage: File,
        name: "profileImage" | "coverImage",
        filename: string
      ) => {
        const deleteprofile = deleteFile(community[name]);
        const profile = uploadFile(
          profileImage,
          `${title}/${filename}-${Date.now()}`,
          `groups`
        );
        const [deleteprofileUrl, url] = await Promise.all([
          deleteprofile,
          profile,
        ]);

        communityUpdate[name] = url;
      };
      if (profileImage) {
        await imageUpdate(profileImage, "profileImage", "profile-image");
      }
      if (coverImage) {
        await imageUpdate(coverImage, "coverImage", "cover-image");
      }
      await editCommunity({ ...communityUpdate, _id: community._id });
    };
    toast.promise(
      update().catch(async (e) => {
        console.log(e);
        toast.error(JSON.stringify(e.message || e));
        return e;
      }),
      {
        loading: "Updating Community",
        success: "Community Updated",
        error: "Failed to update community",
      }
    );
  };
  if (isLoading || !community) {
    return <FormLoading />;
  } else {
    return (
      <Box
        onSubmit={(e) => submit(e)}
        component={"form"}
        m={1}
        py={2}
        px={2}
        bgcolor={colors.surface}
        borderRadius={1}
        mb={10}
      >
        <div className="flex justify-between items-center">
          <Typography variant="h5">Edit {community.title}</Typography>
          <div className="flex gap-1">
            <Button
              variant="contained"
              onClick={draft}
              type="submit"
              startIcon={<DraftsIcon />}
            >
              Save
            </Button>
          </div>
        </div>
        <Box mt={2} className="flex flex-col gap-5">
          {/* name */}
          <FormControl fullWidth>
            <FormLabel>Title</FormLabel>
            <TextField
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label={community.title}
              variant="outlined"
              size="small"
              color="primary"
            />
          </FormControl>
          {/* visibility */}
          <FormControl fullWidth>
            <FormLabel htmlFor="visibility">Visibility</FormLabel>
            {/* select  School,CLubs */}
            <Select
              required
              label="Visibility"
              value={visibility}
              name="visibility"
              color="info"
              onChange={(e) =>
                setVisibility(e.target.value as typeof visibility)
              }
            >
              <MenuItem value={"private"}>Private</MenuItem>
              <MenuItem value={"public"}>Public</MenuItem>
            </Select>
          </FormControl>

          {/* description */}
          <FormControl fullWidth>
            <FormLabel>Description</FormLabel>
            <Editor
              {...{
                setText: setDescription,
                initialText: community.description,
              }}
            />
          </FormControl>

          <FormControl fullWidth>
            <FormLabel>Profile Image</FormLabel>
            <ImageField
              {...{
                selectedImage: profileImage,
                setSelectedImage: setProfileImage,
                name: "profile-image",
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Cover Image</FormLabel>
            <ImageField
              {...{
                selectedImage: coverImage,
                setSelectedImage: setCoverImage,
                name: "cover-image",
              }}
            />
          </FormControl>
          <SelectSocialLinks
            setFilledLinks={setLinks}
            initialLinks={community?.links}
          />
        </Box>
      </Box>
    );
  }
};

export default NewCommunity;
