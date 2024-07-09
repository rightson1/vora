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
import { deleteFile, uploadFile } from "@/components/helpers/functions";
import { PostAdd, PostFetched } from "@/types";
import { useAddPost, useEditPost, useGetPosts } from "@/utils/hooks/usePosts";
import { useParams } from "next/navigation";
import FormLoading from "@/components/loading/FormLoading";

const NewPost = () => {
  const { colors } = useGlobalTheme();
  const [image, setImage] = useState<File | string>("");
  const { data: posts, isLoading } = useGetPosts();
  const params = useParams();
  const [post, setPost] = useState<PostFetched | null>(null);

  const [description, setDescription] = useState(
    `<html xmlns="http://www.w3.org/1999/xhtml"><head>
    </head><body><h1 style="text-align: center">Delete To Start</h1>
    <p>You can highlight text to see more text style option, to change 
    the cover image click on camera icon to select cover image</p><p>
    <strong>NB</strong> please use a laptop to write a blog</p></body>
    </html>`
  );
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("You Can Change This Title");
  const { user } = useAuth();
  const [selectedCommunity, setSelectedCommunity] = useState<string>("");
  const [submit, setSubmit] = useState(false);
  const [status, setStatus] = useState<"unpublished" | "published">(
    "unpublished"
  );
  const { mutateAsync } = useEditPost();
  useEffect(() => {
    const post = posts?.find((post) => post._id === params.post);
    if (post) {
      setPost(post);
      setImage(post.coverImage);
      setDescription(post.description);
      setTitle(post.title);
      setSelectedCommunity(post.communityId);
      setStatus(post.status);
    }
  }, [post, posts]);

  useEffect(() => {
    if (submit) {
      if (!title || !image || !description || !selectedCommunity) {
        setSubmit(false);
        toast.error("Please fill all the fields<image |description|community>");
      } else {
        setSubmit(false);
        const upload = async () => {
          if (!post) return;
          const blog: Partial<PostFetched> = {
            title,
            description,
            coverImage: typeof image === "string" ? image : "",
            communityId: selectedCommunity,
            userId: user._id,
            _id: post?._id,
          };
          if (typeof image !== "string") {
            await deleteFile(post?.coverImage);
            const coverImage = await uploadFile(
              image,
              `${title}-${user.name}`,
              `/users/${user.displayName}/blogs`
            );
            blog.coverImage = coverImage;
          }

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
  if (isLoading) return <FormLoading />;
  if (post)
    return (
      <Box
        m={1}
        py={2}
        px={2}
        mb={20}
        bgcolor={colors.surface}
        borderRadius={1}
      >
        <div className="flex justify-end items-center">
          {/* <Typography variant="h5">New Blog</Typography> */}
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
          <div className="flex gap-1">
            <Button
              variant="contained"
              startIcon={<DraftsIcon />}
              onClick={() => setOpen(true)}
            >
              Save
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
                onClick={() => setImage("")}
                className="absolute top-1 right-1"
              >
                <CancelIcon
                  sx={{
                    color: `${colors.red[800]} !important`,
                  }}
                />
              </IconButton>
              <img
                src={
                  typeof image === "string" ? image : URL.createObjectURL(image)
                }
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
  else return null;
};

export default NewPost;
