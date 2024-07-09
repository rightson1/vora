import React, { use } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { useGlobalTheme } from "@/utils/themeContext";
import TextField from "@mui/material/TextField";
import { useAddComment } from "@/utils/hooks/useComments";
import { useAuth } from "@/utils/AuthContext";
import toast from "react-hot-toast";
import { addNotification } from "@/utils/hooks/useNotification";
import Rate from "@/app/(main)/components/Rate";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { PrivateCommentAdd } from "@/types";
import { useAddPcomment } from "@/utils/hooks/usePrivateComments";
export const CommentInput = ({
  parent,
  parentCommentId,
  owner,
  privateComment,
}: {
  parent: string;
  parentCommentId?: string;
  owner: string;
  privateComment?: boolean;
}) => {
  const [comment, setComment] = useState("");

  const { mutateAsync } = useAddComment();
  const { mutateAsync: addPrivateComment } = useAddPcomment();
  const { user } = useAuth();
  const { _id } = user;
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment) return toast.error("Comment cannot be empty");
    const data = {
      comment,
      parent,
      userId: _id,
      parentCommentId: parentCommentId ? parentCommentId : "",
    };
    const commentAdd = async () => {
      await mutateAsync(data);
      await addNotification({
        sender: _id,
        receiver: owner,
        title: `${user.name} commented on your post`,
        link: `/posts/${parent}`,
      });
    };
    toast.promise(commentAdd(), {
      loading: "Submitting...",
      success: "Comment added",
      error: "Error adding comment",
    });
    setComment("");
  };
  const submitPrivate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.promise(
      addPrivateComment({
        comment,
        name: user.fakeName,
        parent,
        parentCommentId: parentCommentId ? parentCommentId : "",
      }),
      {
        loading: "Submitting...",
        success: "Comment added",
        error: "Error adding comment",
      }
    );
  };
  return (
    <Box
      component="form"
      onSubmit={privateComment ? submitPrivate : submit}
      className="flex flex-col gap-3"
    >
      <Typography variant="h6">Comment</Typography>
      <TextField
        id="outlined-basic"
        label="Write your comment here"
        variant="outlined"
        multiline
        minRows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <Button className="w-fit" variant="contained" type="submit">
        Comment
      </Button>
    </Box>
  );
};

export const ImageField = ({
  selectedImage,
  setSelectedImage,
  name,
}: {
  selectedImage: File | null;
  name: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
}) => {
  const { colors } = useGlobalTheme();
  const handleImageClear = () => {
    setSelectedImage(null);
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target?.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <Box
      component={selectedImage ? "div" : "label"}
      borderRadius={1}
      htmlFor={name}
      className={`w-full p-4 text-center cursor-pointer`}
      sx={{
        border: selectedImage ? "none" : "2px dashed",
        borderColor: colors.textSecondary,
      }}
    >
      {selectedImage ? (
        <Box className="relative">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Uploaded"
            className="max-w-full max-h-32"
          />
          <ClearIcon
            fontSize="small"
            className="absolute top-0 right-0 cursor-pointer"
            onClick={handleImageClear}
          />
        </Box>
      ) : (
        <>
          <CloudUploadIcon fontSize="large" color="action" />
          <Typography variant="body2" color="textSecondary">
            Click to upload
          </Typography>
        </>
      )}
      <input
        type="file"
        //onlyimage
        accept="image/*"
        id={name}
        className="hidden"
        onChange={handleImageUpload}
      />
    </Box>
  );
};

export const PrivateCommentInput = ({
  parent,
  parentCommentId,
}: {
  parent: string;
  parentCommentId?: string;
}) => {
  const [comment, setComment] = useState("");
  const { mutateAsync: add } = useAddPcomment();
  const { user } = useAuth();
  const [value, setValue] = useState(2);
  const [name, setName] = useState("");
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: PrivateCommentAdd = {
      comment,
      name: user.fakeName,
      parent,
      parentCommentId: parentCommentId ? parentCommentId : "",
      rating: {
        rating: value,
        ratingId: user.fakeName,
      },
    };
    toast.promise(add(data), {
      loading: "Submitting...",
      success: "Comment added",
      error: "Error adding comment",
    });
    setComment("");
    setName("");
  };
  return (
    <Box component="form" onSubmit={submit} className="flex flex-col gap-3">
      <Typography variant="h6">Comment</Typography>
      <FormControl>
        <FormLabel>Comment</FormLabel>
        <TextField
          id="outlined-basic"
          label="Write your comment here"
          variant="outlined"
          multiline
          required
          minRows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Rate</FormLabel>
        <Rate value={value} setValue={setValue} />
      </FormControl>
      <Button className="w-fit" variant="contained" type="submit">
        Comment
      </Button>
    </Box>
  );
};
