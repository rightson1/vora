"use client";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import Typography from "@mui/material/Typography";
import DraftsIcon from "@mui/icons-material/Drafts";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useState } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Editor from "@/components/utils/Editor";
import { useAuth } from "@/utils/AuthContext";
import { deleteFile, uploadFile } from "@/components/helpers/functions";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import { ImageField } from "@/components/helpers/inputs";
import toast from "react-hot-toast";
import { useAddAnnouncement } from "@/utils/hooks/useAnnouncements";
import { AnnouncementAdd } from "@/types";
const NewEvent = () => {
  const { colors } = useGlobalTheme();
  const { user, communitiesIn } = useAuth();
  const [values, setValues] = useState<{
    title: string;
    link: string;
    venue?: string;
  }>({
    title: "",
    link: "",
    venue: "",
  });
  const [selectedCommunity, setSelectedCommunity] = useState<string>(
    communitiesIn?.[0]?._id ?? ""
  );

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const { mutateAsync: addAnnouncement, isError } = useAddAnnouncement();
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (isError && url) {
      const deleteFiles = async () => await deleteFile(url);
      deleteFiles();
    }
  }, [isError]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = values.title.replace(/\s/g, "-");
    const data: AnnouncementAdd = {
      title: values.title,
      description,
      communityId: selectedCommunity,
      userId: user._id,
      views: [],
      coverImage: "",
    };
    const upload = async () => {
      if (selectedImage) {
        const url = await uploadFile(
          selectedImage,
          `${title}-${user.name}`,
          `/users/${user.displayName}/announcements`
        );
        data.coverImage = url;
      }
      setUrl(url);
      await addAnnouncement(data);
      setValues({
        title: "",
        link: "",
        venue: "",
      });
      setSelectedImage(null);
      setDescription("");
    };
    toast.promise(upload(), {
      loading: "Uploading announcement...",
      success: "Announcement uploaded successfully",
      error: "Could not upload announcement, try again later",
    });
  };
  const handleChanges = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <Box
      m={1}
      py={2}
      mb={10}
      px={2}
      bgcolor={colors.surface}
      borderRadius={1}
      component={"form"}
      onSubmit={submit}
    >
      <div className="flex justify-between items-center">
        <Typography variant="h5">Make Announcement</Typography>
      </div>
      <Box mt={2} className="flex flex-col gap-5">
        {/* name */}
        <FormControl fullWidth>
          <FormLabel>Title</FormLabel>
          <TextField
            multiline
            minRows={2}
            onChange={(e) => handleChanges(e)}
            label="Title"
            variant="outlined"
            size="small"
            color="primary"
            name="title"
            required
          />
        </FormControl>
        {/* description */}
        <FormControl fullWidth>
          <FormLabel>Description</FormLabel>
          <Editor {...{ setText: setDescription }} />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor="community">Community</FormLabel>
          {/* select  School,CLubs */}
          <Select
            label="Community"
            name="community"
            onChange={(e) => setSelectedCommunity(e.target.value as string)}
            color="info"
            required
          >
            {communitiesIn?.map((community) => (
              <MenuItem value={community._id}>{community.title}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Cover Image</FormLabel>
          <ImageField
            {...{
              selectedImage: selectedImage,
              setSelectedImage: setSelectedImage,
              name: "cover-image",
            }}
          />
        </FormControl>

        <div className="flex gap-1 justify-end">
          <Button variant="contained" type="submit" startIcon={<DraftsIcon />}>
            Publish
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default NewEvent;
