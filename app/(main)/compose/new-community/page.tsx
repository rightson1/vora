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
import dayjs, { Dayjs } from "dayjs";
import { ImageField } from "@/components/helpers/inputs";
import toast from "react-hot-toast";
import { deleteFile, uploadFile } from "@/components/helpers/functions";
import { LinkType, communityMember } from "@/types";
import { useAuth } from "@/utils/AuthContext";
import { SelectSocialLinks } from "@/components/helpers/atoms";
import { useAddCommunity, useGetCommunities } from "@/utils/hooks/useCommunity";

const NewCommunity = () => {
  const { colors } = useGlobalTheme();
  const { user } = useAuth();
  const [value, setValue] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );
  const [urls, setUrls] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [links, setLinks] = useState<LinkType[]>([]);
  const { mutateAsync: addCommunity, isError } = useAddCommunity();
  const { data } = useGetCommunities();

  useEffect(() => {
    if (isError && urls.length > 0) {
      const deleteFiles = async () =>
        await Promise.all(urls.map((url) => deleteFile(url)));
      deleteFiles();
    }
  }, [isError]);
  useEffect(() => {
    const title = localStorage.getItem("title");
    const description = localStorage.getItem("description");
    setTitle(title || "");
    setDescription(description || "");
  }, []);
  const draft = () => {
    localStorage.setItem("title", title);
    localStorage.setItem("description", description);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const visibility: "private" | "public" = e.currentTarget.visibility.value;
    const admin: communityMember = {
      role: "admin",
      status: "active",
      userId: user._id,
    };

    // return;
    // const community:Partial<CommunityType> = {
    //   title,
    //   visibility,
    //   description,
    //   members: [admin],
    //   links,
    // };
    if (!coverImage || !profileImage)
      return toast.error("Please select cover and profile image");

    const upload = async () => {
      const cover = uploadFile(coverImage, `${title}/cover-image`, `groups`);
      const profile = uploadFile(
        profileImage,
        `${title}/profile-image`,
        `groups`
      );
      const [coverUrl, profileUrl] = await Promise.all([cover, profile]);
      setUrls([coverUrl, profileUrl]);
      const community = {
        title,
        visibility,
        description,
        members: [admin],
        links,
        coverImage: coverUrl,
        profileImage: profileUrl,
      };
      await addCommunity(community);
    };
    toast.promise(
      upload().catch(async (e) => {
        console.log(e);
        toast.error(JSON.stringify(e.message || e));
      }),
      {
        loading: "Creating Community",
        success: "Community Created",
        error: "Failed to create community",
      }
    );
  };
  return (
    <Box m={1} py={2} px={2} bgcolor={colors.surface} borderRadius={1} mb={10}>
      <div className="flex justify-between items-center">
        <Typography variant="h5">New Community</Typography>
        <div className="flex gap-1">
          <Button
            variant="contained"
            onClick={draft}
            type="button"
            startIcon={<DraftsIcon />}
          >
            Save Draft
          </Button>
        </div>
      </div>
      <Box
        mt={2}
        className="flex flex-col gap-5"
        onSubmit={(e) => submit(e)}
        component={"form"}
      >
        {/* name */}
        <FormControl fullWidth>
          <FormLabel>Title</FormLabel>
          <TextField
            name="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Title"
            variant="outlined"
            size="small"
            color="primary"
          />
        </FormControl>
        {/* visibility */}
        <FormControl fullWidth>
          <FormLabel htmlFor="visibility">Visibility</FormLabel>
          {/* select  School,CLubs */}
          <Select required label="Visibility" name="visibility" color="info">
            <MenuItem value={"private"}>Private</MenuItem>
            <MenuItem value={"public"}>Public</MenuItem>
          </Select>
        </FormControl>

        {/* description */}
        <FormControl fullWidth>
          <FormLabel>Description</FormLabel>
          <Editor {...{ setText: setDescription, initialText: description }} />
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
        <SelectSocialLinks setFilledLinks={setLinks} />
        <div className="w-full flex justify-end">
          <Button variant="contained" type="submit" startIcon={<AddIcon />}>
            Publish
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default NewCommunity;
