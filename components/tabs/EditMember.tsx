import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { CommunityMemberEdit, communityUser } from "@/types";
import {
  useEditCommunityMember,
  useGetCommunities,
} from "@/utils/hooks/useCommunity";
import toast from "react-hot-toast";
import { addNotification } from "@/utils/hooks/useNotification";

const EditMember = ({
  isOpen,
  onClose,
  user,
  communityId,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: communityUser;
  communityId: string;
}) => {
  const [role, setRole] = React.useState<"admin" | "member">(user.role);
  const [status, setStatus] = React.useState<"active" | "pending" | "banned">(
    user.status
  );
  const { data: communities } = useGetCommunities();
  const community = communities?.find((c) => c._id === communityId);
  const { mutateAsync: editCommunityMember } = useEditCommunityMember();
  // Handle form submission
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const data: CommunityMemberEdit = {
      communityId: communityId,
      userId: user._id,
      role: role,
      status: status,
    };
    const edit = async () => {
      await addNotification({
        sender: "Admin",
        receiver: user._id,
        title: `Your status in ${community?.title} has been changed to ${status}`,
        link: `/communities/${communityId}`,
      });

      await editCommunityMember(data);
      onClose();
    };
    toast.promise(edit(), {
      loading: "Saving...",
      success: "Saved!",
      error: "An error occurred.",
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent
        sx={{
          minWidth: "300px",
        }}
      >
        <form onSubmit={handleFormSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="role">Role</InputLabel>
            <Select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value as typeof role)}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="member">Member</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="status">Status</InputLabel>
            <Select
              id="status"
              name="status"
              // value={editedUser.status
              value={status}
              onChange={(e) => setStatus(e.target.value as typeof status)}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleFormSubmit} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditMember;
