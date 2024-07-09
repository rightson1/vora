import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import {
  deleteFile,
  uploadFile,
  useIsCommunityUser,
} from "../helpers/functions"; // saves file to Firebase and returns URL
import toast from "react-hot-toast";
import { ImageField } from "../helpers/inputs";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { CommunityFetched, CommunityImageFetched } from "@/types";
import { useAuth } from "@/utils/AuthContext";
import { Typography } from "@mui/material";
import { useDeleteImage, useEditImage } from "@/utils/hooks/useImages";
import { useParams } from "next/navigation";

export default function ImageEdit({
  open,
  onClose,
  image,
}: {
  open: boolean;
  onClose: () => void;
  image: CommunityImageFetched;
}) {
  const [name, setName] = useState(image.name);
  const [description, setDescription] = useState(image.description);
  const { user } = useAuth();
  const { mutateAsync: imageUpdate } = useEditImage();
  const params = useParams();
  const isAdmin = useIsCommunityUser("admin", params.community);
  const owner = image.userId === user._id || isAdmin;
  const { mutateAsync: deleteImage } = useDeleteImage();
  const handleUpload = async () => {
    const upload = async () => {
      await imageUpdate({ name, description, _id: image._id });
      setName("");
      setDescription("");
      onClose();
    };
    toast.promise(upload(), {
      loading: "Uploading...",
      success: "Image uploaded successfully",
      error: "Failed to upload image",
    });
  };
  const handleDelete = async () => {
    const destoryImage = async () => {
      await Promise.all([deleteImage(image._id), deleteFile(image.url)]);
      onClose();
    };
    toast.promise(destoryImage(), {
      loading: "Deleting...",
      success: "Image deleted successfully",
      error: "Failed to delete image",
    });
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Image</DialogTitle>
      <DialogContent className="w-[80vw] sm:w-[400px] flex flex-col gap-5">
        <FormControl>
          <img
            src={image.url}
            alt="Uploaded"
            className="object-cover max-w-full max-h-32"
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Name</FormLabel>
          {owner ? (
            <TextField
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
              variant="outlined"
              size="small"
              color="primary"
            />
          ) : (
            <Typography>{image.name}</Typography>
          )}
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Description</FormLabel>
          {owner ? (
            <TextField
              name="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
              variant="outlined"
              size="small"
              color="primary"
              multiline
              minRows={2}
            />
          ) : (
            <Typography>{image.description}</Typography>
          )}
        </FormControl>
      </DialogContent>

      <DialogActions>
        {/* Upload button */}
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        {owner && (
          <Button onClick={handleDelete} color="primary" disabled={!owner}>
            Delete
          </Button>
        )}
        <Button onClick={handleUpload} color="primary" disabled={!owner}>
          Edit
        </Button>
        {/* Close button */}
      </DialogActions>
    </Dialog>
  );
}
