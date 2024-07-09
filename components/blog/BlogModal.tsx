import { blogStatus, openProps } from "@/types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormLabel from "@mui/material/FormLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useAuth } from "@/utils/AuthContext";
import Button from "@mui/material/Button";
import { useParams } from "next/navigation";
const BlogModal = ({
  open,
  setOpen,
  selectedCommunity,
  setSelectedCommunity,
  setSubmit,
  status,
  setStatus,
}: openProps & {
  selectedCommunity: string;
  setSelectedCommunity: React.Dispatch<React.SetStateAction<string>>;
  setSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  status: blogStatus;
  setStatus: React.Dispatch<React.SetStateAction<blogStatus>>;
}) => {
  const { communitiesIn } = useAuth();
  const handleClose = () => setOpen(false);
  const params = useParams();

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent
        sx={{
          minWidth: {
            sm: "80vw",
            md: "500px",
          },
        }}
      >
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
        <FormControl fullWidth>
          <FormLabel htmlFor="status">Status</FormLabel>
          {/* select  School,CLubs */}
          <Select
            label="Status"
            name="status"
            onChange={(e) => setStatus(e.target.value as blogStatus)}
            color="info"
            value={status}
            required
          >
            {["published", "unpublished"].map((status) => (
              <MenuItem value={status}>{status}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => setSubmit(true)}>Publish</Button>
      </DialogActions>
    </Dialog>
  );
};
export default BlogModal;
