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
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import { ImageField } from "@/components/helpers/inputs";
import toast from "react-hot-toast";
import { useEditEvent, useGetEvents } from "@/utils/hooks/useEvents";
import { useRouter } from "next/navigation";
import { EventFetched, eventStatus } from "@/types";
import { useParams } from "next/navigation";
import FormLoading from "@/components/loading/FormLoading";
import { set } from "mongoose";
const NewEvent = () => {
  const { colors } = useGlobalTheme();
  const { user, communitiesIn } = useAuth();
  const { data: events } = useGetEvents();
  const params = useParams();
  const [event, setEvent] = useState<EventFetched | null>(null);
  const [status, setStatus] = useState<eventStatus>("pending");
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
  const [date, setDate] = React.useState<Dayjs | null>(
    dayjs("2022-04-17T15:30")
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const isAdmin = useIsCommunityUser("admin", selectedCommunity);
  const isMember = useIsCommunityUser("member", selectedCommunity);
  const { mutateAsync: editEvent, isError } = useEditEvent();
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (isError && url) {
      const deleteFiles = async () => await deleteFile(url);
      deleteFiles();
    }
  }, [isError]);
  useEffect(() => {
    if (events) {
      const event = events.find((event) => event._id === params.event);
      if (event) {
        setEvent(event);
        setDate(dayjs(event.eventDate));
        setValues({
          title: event.title,
          link: event.link || "",
          venue: event.venue,
        });

        setSelectedCommunity(event.communityId);
      }
    }
  }, [events]);
  if (!event) return <FormLoading />;
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const eventData = date?.format("YYYY-MM-DDTHH:mm");

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
      coverImage: event.coverImage,
      _id: event._id,
    };

    const upload = async () => {
      if (selectedImage) {
        await deleteFile(event.coverImage);
        const url = await uploadFile(
          selectedImage,
          `${title}-${user.name}`,
          `/users/${user.displayName}/events`
        );
        data.coverImage = url;
        setUrl(url);
      }
      await editEvent(data);
    };
    toast.promise(upload(), {
      loading: "Editing event...",
      success: "Event edited successfully",
      error: "Could not edit event, try again later",
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
            value={values.title}
            size="small"
            color="primary"
            name="title"
            required
          />
        </FormControl>
        {/* description */}
        <FormControl fullWidth>
          <FormLabel>Description</FormLabel>
          <Editor
            {...{ setText: setDescription, initialText: event.description }}
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor="visibility">Community</FormLabel>
          {/* select  School,CLubs */}
          <Select
            label="Visibility"
            name="visibility"
            onChange={(e) => setSelectedCommunity(e.target.value as string)}
            color="info"
            value={selectedCommunity}
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
            label={false}
            variant="outlined"
            size="small"
            color="primary"
            value={values.link}
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
              onChange={(e) => setStatus(e.target.value as eventStatus)}
            >
              {["pending", "approved", "rejected", "unpublished", "past"].map(
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
