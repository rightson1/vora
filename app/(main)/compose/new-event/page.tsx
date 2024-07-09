"use client";
import React, { useEffect } from "react";
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
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { useAuth } from "@/utils/AuthContext";
import {
  deleteFile,
  uploadFile,
  useIsCommunityUser,
} from "@/components/helpers/functions";
import { useGetCommunities } from "@/utils/hooks/useCommunity";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import { ImageField } from "@/components/helpers/inputs";
import toast from "react-hot-toast";
import { useAddEvent } from "@/utils/hooks/useEvents";
const NewEvent = () => {
  const { colors } = useGlobalTheme();
  const { user, communitiesIn } = useAuth();
  const [status, setStatus] = useState<"pending" | "approved" | "rejected">(
    "pending"
  );
  const [values, setValues] = useState<{
    title: string;
    link: string;
    venue?: string;
  }>({
    title: "",
    link: "",
    venue: "",
  });
  const [selectedCommunity, setSelectedCommunity] = useState<
    string | undefined
  >(undefined);
  const [visibility, setVisibility] = React.useState<"school" | "community">(
    "school"
  );
  const [date, setDate] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const isAdmin = useIsCommunityUser("admin", selectedCommunity);
  const { mutateAsync: addEvent, isError } = useAddEvent();
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (isError) {
      const deleteFiles = async () => await deleteFile(url);
      deleteFiles();
    }
  }, [isError]);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCommunity) return toast.error("Please select a community");
    const eventData = date?.format("YYYY-MM-DDTHH:mm");
    if (!selectedImage)
      return toast.error("Please select a cover image, just use anything");
    const title = values.title.replace(/\s/g, "-");
    const data = {
      title: values.title,
      description,
      venue: values.venue,
      eventData,
      link: values.link,
      status,
      communityId: selectedCommunity,
      userId: user._id,
      likes: [],
      coverImage: "",
    };
    const upload = async () => {
      const url = await uploadFile(
        selectedImage,
        `${title}-${user.name}`,
        `/users/${user.displayName}/events`
      );
      data.coverImage = url;
      setUrl(url);
      await addEvent(data);
      setValues({
        title: "",
        link: "",
        venue: "",
      });
      setSelectedImage(null);
      setDescription("");
    };
    toast.promise(upload(), {
      loading: "Uploading event...",
      success: "Event uploaded successfully",
      error: "Could not upload event, try again later",
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
        <Typography variant="h5">Propose Event</Typography>
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
          <FormLabel htmlFor="visibility">Community</FormLabel>
          {/* select  School,CLubs */}
          <Select
            label="Visibility"
            name="visibility"
            onChange={(e) => setSelectedCommunity(e.target.value as string)}
            color="info"
            required
          >
            {communitiesIn?.map((community) => (
              <MenuItem value={community._id}>{community.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth color="info">
          <FormLabel>Event Date</FormLabel>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {/* <DemoContainer components={["DateTimeField", "DateTimeField"]}> */}
            <DateTimeField
              label="Enter Date and Time of Event"
              value={date}
              onChange={(newValue) => setDate(newValue)}
            />
            {/* </DemoContainer> */}
          </LocalizationProvider>
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
        <FormControl fullWidth>
          <FormLabel>Link</FormLabel>
          <TextField
            label="Link"
            variant="outlined"
            size="small"
            color="primary"
            name="link"
            onChange={(e) => handleChanges(e)}
          />
        </FormControl>
        {isAdmin && (
          <FormControl fullWidth>
            <FormLabel>Status</FormLabel>
            <Select
              value={status}
              label="Status"
              name="status"
              color="info"
              required
              defaultValue={"pending"}
              onChange={(e) =>
                setStatus(e.target.value as "pending" | "approved" | "rejected")
              }
            >
              {["pending", "approved", "rejected", "unpublished"].map(
                (status) => (
                  <MenuItem value={status}>{status}</MenuItem>
                )
              )}
            </Select>
          </FormControl>
        )}

        {status === "approved" && (
          <FormControl fullWidth>
            <FormLabel>Venue</FormLabel>
            <TextField
              label="Venue"
              variant="outlined"
              size="small"
              color="primary"
              name="venue"
              onChange={(e) => handleChanges(e)}
            />
          </FormControl>
        )}
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
