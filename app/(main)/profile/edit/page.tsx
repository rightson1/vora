"use client";
import React, { useEffect, useMemo } from "react";
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
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import { useAuth } from "@/utils/AuthContext";
import { ImageField } from "@/components/helpers/inputs";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { deleteFile, uploadFile } from "@/components/helpers/functions";
import { useDeleteUser, useUpdateUser } from "@/utils/hooks/useUser";
import { LinkType, User } from "@/types";
import toast from "react-hot-toast";
import { SocialIconsTypes } from "@/types";
import { SelectSocialLinks } from "@/components/helpers/atoms";
import { FormHelperText } from "@mui/material";
const NewEvent = () => {
  const { colors } = useGlobalTheme();
  const { user, fetchUser, communitiesIsAdmin } = useAuth();
  const [bio, setBio] = useState("");

  useEffect(() => {
    setBio(user?.bio || "");
  }, [user]);
  const initialText = useMemo(() => {
    if (user && user.bio) {
      return user.bio;
    }
    return "";
  }, [user]);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [fakeName, setFakeName] = useState(user?.fakeName || "");
  const { mutateAsync } = useUpdateUser();
  const [filledLinks, setFilledLinks] = useState<LinkType[]>([]); // [{name: "github", link: "
  const { mutateAsync: deleteUser } = useDeleteUser();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formResults = e.target as HTMLFormElement;
    const formData = new FormData(formResults);
    const data: Record<string, FormDataEntryValue | string> = {};
    for (let [name, value] of formData.entries()) {
      if (value) {
        data[name] = value;
      }
    }
    const update = async () => {
      if (!user) return;
      const userUpdateData: Partial<User> = {}; // Create an empty User object

      if (profileImage) {
        user?.profileImage && (await deleteFile(user.profileImage));
        userUpdateData.profileImage = await uploadFile(
          profileImage,
          `profile-image-${user.displayName}-${Date.now()}`,
          `/users/${user.displayName}`
        );
      }
      if (coverImage) {
        user?.coverImage && (await deleteFile(user.coverImage));
        userUpdateData.coverImage = await uploadFile(
          coverImage,
          `cover-image-${user.displayName}-${Date.now()}`,
          `/users/${user.displayName}`
        );
      }
      //add 3 random latters to fakename
      userUpdateData.fakeName =
        user.fakeName || `user-${Math.random().toString(36).substring(4)}`;
      userUpdateData.uid = user.uid;
      userUpdateData.bio = bio || user.bio;
      Object.assign(userUpdateData, data);
      userUpdateData.links = filledLinks;
      await mutateAsync(userUpdateData);
      fetchUser(user.uid);
    };
    toast.promise(
      update().catch((e) => {
        console.log(e);
        toast.error(JSON.stringify(e.message || e));
      }),
      {
        loading: "Loading",
        error: "There was an error updating",
        success: "Success",
      }
    );
  };
  const deleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      if (communitiesIsAdmin.length > 0) {
        toast.error(
          "You cannot delete your account because you are an admin of a community. Please leave the community first."
        );
        return;
      } else {
        toast.promise(deleteUser(), {
          loading: "Loading",
          error: "There was an error deleting your account",
          success: "Success",
        });
      }
    }
  };
  return (
    <Box
      component="form"
      m={1}
      py={2}
      px={2}
      mb={40}
      bgcolor={colors.surface}
      borderRadius={1}
      onSubmit={submit}
    >
      <div className="flex justify-between items-center">
        <Typography variant="h5">Edit Account</Typography>
        <div className="flex gap-1">
          <Button variant="contained" startIcon={<DraftsIcon />} type="submit">
            Save
          </Button>
        </div>
      </div>
      <Box mt={2} className="flex flex-col gap-5">
        {/* name */}
        <FormControl fullWidth>
          <FormLabel>Name</FormLabel>
          <TextField
            label={user?.name || "Name"}
            variant="outlined"
            size="small"
            name="name"
            color="primary"
          />
        </FormControl>
        <FormControl fullWidth>
          <FormLabel>Profession</FormLabel>
          <TextField
            label={user?.profession || "Enter profession eg. Web Developer"}
            variant="outlined"
            size="small"
            name="profession"
            color="primary"
          />
        </FormControl>
        {/* description */}
        <FormControl fullWidth>
          <FormLabel>Description</FormLabel>

          <Editor {...{ initialText, setText: setBio }} />
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
        <SelectSocialLinks {...{ setFilledLinks, initialLinks: user.links }} />
        <div className="w-full flex justify-end">
          <Button
            variant="contained"
            startIcon={<DeleteOutlineOutlinedIcon />}
            type="button"
            onClick={deleteAccount}
          >
            Delete Account
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default NewEvent;
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
