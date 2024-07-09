import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Rating } from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { LectureFetched } from "@/types";
import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import { toast } from "react-hot-toast";

export default function LecCard({ lec }: { lec: LectureFetched }) {
  const router = useRouter();
  return (
    <Card
      sx={{
        width: "100%",
      }}
      className="cursor-pointer"
      onClick={() => router.push(`/lectures/${lec._id}`)}
    >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5">
            {lec.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {lec.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="flex justify-between items-center">
        <IconButton
          aria-label="share"
          onClick={(e) => {
            e.stopPropagation();
            const currentUrl = `${window.location.origin}/lectures/${lec._id}`;
            navigator.clipboard.writeText(currentUrl);
            toast.success("Copied Link to clipboard");
          }}
        >
          <ShareIcon />
        </IconButton>
        <Rating value={lec.averageRating} precision={0.5} readOnly />
      </CardActions>
    </Card>
  );
}
