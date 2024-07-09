"use client";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useGlobalTheme } from "@/utils/themeContext";
import DraftsIcon from "@mui/icons-material/Drafts";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import { IconButton, InputBase } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import BlogEditor from "@/components/utils/BlogEditor";
import { useAuth } from "@/utils/AuthContext";
import BlogModal from "@/components/blog/BlogModal";
import toast from "react-hot-toast";
import { uploadFile } from "@/components/helpers/functions";
import { PostAdd, blogStatus } from "@/types";
import { useAddPost } from "@/utils/hooks/usePosts";
import Typography from "@mui/material/Typography";
import Title from "../../components/Title";

const NewPost = () => {
  const { colors } = useGlobalTheme();
  const [status, setStatus] = useState<blogStatus>("published");
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState(
    `<html xmlns="http://www.w3.org/1999/xhtml"><head>
    </head><body><h1 style="text-align: center">Delete To Start</h1>
    <p>You can highlight text to see more text style option, to change 
    the cover image click on camera icon to select cover image</p><p>
    <p>Blogs, poems, stories, No rules.Free to express yourself</p>
    <strong>NB</strong> please use a laptop to write a blog</p></body>
    </html>`
  );
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("You Can Change This Title");
  const { user } = useAuth();
  const [selectedCommunity, setSelectedCommunity] = useState<string>("");
  const [submit, setSubmit] = useState(false);
  const { mutateAsync } = useAddPost();
  useEffect(() => {
    if (submit) {
      if (!title || !image || !description || !selectedCommunity) {
        setSubmit(false);
        toast.error("Please fill all the fields<image |description|community>");
      } else {
        setSubmit(false);
        const upload = async () => {
          const coverImage = await uploadFile(
            image,
            `${title}-${user.name}`,
            `/users/${user.displayName}/blogs`
          );
          const blog: PostAdd = {
            title,
            description,
            coverImage,
            communityId: selectedCommunity,
            status,
            likes: [],
            userId: user._id,
          };
          setOpen(false);
          await mutateAsync(blog);
        };
        toast.promise(upload(), {
          loading: "Uploading...",
          success: "Uploaded",
          error: "Failed to upload",
        });
      }
    }
  }, [submit]);
  return (
    <Box m={1} py={2} px={2} mb={20} bgcolor={colors.surface} borderRadius={1}>
      <div className="flex justify-end items-center">
        {/* <Typography variant="h5">New Blog</Typography> */}
        <Title title="New Blog" />
        <BlogModal
          {...{
            open,
            setOpen,
            status,
            setStatus,

            selectedCommunity,
            setSelectedCommunity,
            setSubmit,
          }}
        />
        <div className="flex items-center  justify-between w-full">
          <Typography variant="h5">New Blog</Typography>
          <Button
            variant="contained"
            startIcon={<DraftsIcon />}
            onClick={() => setOpen(true)}
          >
            Publish
          </Button>
        </div>
      </div>

      <Box mt={4} className="flex flex-col gap-5">
        {/* name */}
        <FormControl fullWidth>
          <InputBase
            placeholder="Title"
            multiline
            className="text-3xl font-bold "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>

        {!image && (
          <Box
            component={"label"}
            htmlFor="coverImage"
            className="w-[30px] cursor-pointer h-[30px] rounded-full items-center flex justify-center "
            sx={{
              border: `1px solid ${colors.active}`,
            }}
          >
            <input
              type="file"
              //onlyimage
              accept="image/*"
              id={"coverImage"}
              className="hidden"
              onChange={(e) => {
                if (!e.target.files) return;
                setImage(e.target.files[0]);
              }}
            />
            <CameraAltOutlinedIcon
              color="info"
              sx={{
                fontSize: "1rem",
              }}
            />
          </Box>
        )}
        {/* diplay image from file with cancel option to to right  */}
        {image && (
          <div className="flex items-center gap-1 relative">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => setImage(null)}
              className="absolute top-1 right-1"
            >
              <CancelIcon
                sx={{
                  color: `${colors.red[800]} !important`,
                }}
              />
            </IconButton>
            <img
              src={URL.createObjectURL(image)}
              alt=""
              className="w-full h-[250px] rounded-sm object-cover"
            />
          </div>
        )}
      </Box>

      <div className="mt-3"></div>
      <BlogEditor setText={setDescription} initialText={description} />
    </Box>
  );
};

export default NewPost;
