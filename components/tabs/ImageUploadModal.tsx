import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { deleteFile, uploadFile } from "../helpers/functions"; // saves file to Firebase and returns URL
import toast from "react-hot-toast";
import { ImageField } from "../helpers/inputs";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { CommunityFetched } from "@/types";
import { useAddImage } from "@/utils/hooks/useImages";
import { useAuth } from "@/utils/AuthContext";

export default function ImageUploadModal({
  open,
  onClose,
  community,
}: {
  open: boolean;
  onClose: () => void;
  community: CommunityFetched;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { mutateAsync, isError } = useAddImage();
  const [url, setUrl] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (isError) {
      const deleteUploadedFile = async () => await deleteFile(url);
      deleteUploadedFile();
    }
  }, [isError]);

  const handleUpload = async () => {
    if (!file) return toast.error("Please select an image");
    const upload = async () => {
      const url = await uploadFile(
        file,
        `${community.title}/gallery/${name}`,
        `groups`
      );
      setUrl(url);
      await mutateAsync({
        communityId: community._id,
        url,
        name,
        description,
        userId: user._id,
      });
      setFile(null);
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
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Image</DialogTitle>
      <DialogContent className="w-[80vw] sm:w-[400px] flex flex-col gap-5">
        <FormControl>
          <ImageField
            selectedImage={file}
            setSelectedImage={setFile}
            name="image"
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Name</FormLabel>
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
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Description</FormLabel>
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
        </FormControl>
      </DialogContent>

      <DialogActions>
        {/* Upload button */}
        <Button onClick={handleUpload} color="primary">
          Upload
        </Button>
        {/* Close button */}
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
