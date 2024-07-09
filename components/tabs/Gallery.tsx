import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import Typography from "@mui/material/Typography";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Button from "@mui/material/Button";
import { uploadFile } from "../helpers/functions"; //saves file to firebase and return url
import { useAddImage, useGetImages } from "@/utils/hooks/useImages";
import { useAuth } from "@/utils/AuthContext";
import { CommunityFetched, CommunityImageFetched } from "@/types";
import toast from "react-hot-toast";
import ImageUploadModal from "./ImageUploadModal";
import { LoadingCard } from "../loading/LoadingAtoms";
import Lightbox from "yet-another-react-lightbox";
import ImageEdit from "./ImageEdit";
import EditIcon from "@mui/icons-material/Edit";
export default function Gallery({
  community,
  onTour,
}: {
  community: CommunityFetched;
  onTour?: boolean;
}) {
  const { data: images, isLoading } = useGetImages(community._id);
  const [open, setOpen] = React.useState(false);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [editImageModal, setEditImageModal] =
    React.useState<CommunityImageFetched | null>(null);
  const { user } = useAuth();

  return (
    <ImageList>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={images?.map((image) => ({ src: image.url }))}
      />
      <ImageUploadModal
        open={open}
        onClose={() => setOpen(false)}
        community={community}
      />

      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader
          component="div"
          className="flex justify-between items-center"
        >
          <Typography>Community Images</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpen(true)}
            endIcon={<AddCircleOutlineIcon />}
            disabled={onTour}
          >
            Add Image
          </Button>
        </ListSubheader>
      </ImageListItem>
      {isLoading ? (
        Array(10)
          .fill(0)
          .map((item, index) => (
            <ImageListItem key={index}>
              <LoadingCard />
            </ImageListItem>
          ))
      ) : images && images?.length > 0 ? (
        images.map((item) => {
          const author = community.users.find(
            (member) => member._id === item.userId
          );
          const isOwner = author?._id === user._id;
          return (
            <ImageListItem className="cursor-pointer" key={item._id}>
              <img
                src={item.url}
                className="object-cover h-[250px] md:h-[300px]"
                alt={item.name}
                loading="lazy"
                onClick={() => setLightboxOpen(true)}
              />
              <ImageListItemBar
                title={item.name}
                subtitle={author?.name}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    onClick={() => setEditImageModal(item)}
                    aria-label={`info about ${item.name}`}
                  >
                    <InfoIcon />
                  </IconButton>
                }
              />
              {editImageModal && (
                <ImageEdit
                  open={!!editImageModal}
                  onClose={() => setEditImageModal(null)}
                  image={editImageModal}
                />
              )}
            </ImageListItem>
          );
        })
      ) : (
        <>
          <Typography my={2}>No images found</Typography>
        </>
      )}
    </ImageList>
  );
}
