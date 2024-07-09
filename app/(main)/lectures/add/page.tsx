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
import toast from "react-hot-toast";
import { useAddEvent } from "@/utils/hooks/useEvents";
import Rate from "../../components/Rate";
import LecRateModal from "../../components/LecRateModal";
import { useAddLecture } from "@/utils/hooks/useLectures";
import { useAuth } from "@/utils/AuthContext";

const NewEvent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { mutateAsync: addLec } = useAddLecture();
  const { colors } = useGlobalTheme();
  const [value, setValue] = useState(3);
  const { user } = useAuth();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return toast.error("Please rate the lecture");
    toast.promise(
      addLec({
        name,
        description,
        rating: [
          {
            rating: value,
            ratingId: user.fakeName,
          },
        ],
      }),
      {
        loading: "Adding lecture...",
        success: "Lecture added successfully",
        error: "Failed to add lecture",
      },
      {
        style: {
          minWidth: "250px",
        },
      }
    );
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
      <LecRateModal title={"Terms And Conditions"} localStorageitem="add Lec" />
      <div className="flex justify-between items-center">
        <Typography variant="h5">Add Lecture</Typography>
      </div>
      <Box mt={2} className="flex flex-col gap-5">
        {/* name */}
        <FormControl fullWidth>
          <FormLabel>Name</FormLabel>
          <TextField
            multiline
            minRows={2}
            onChange={(e) => setName(e.target.value)}
            value={name}
            label="Name"
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
          <TextField
            multiline
            minRows={4}
            onChange={(e) => setDescription(e.target.value)}
            label="description"
            variant="outlined"
            size="small"
            value={description}
            color="primary"
            name="description"
            required
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel>Rate</FormLabel>
          <Rate {...{ value, setValue }} />
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
