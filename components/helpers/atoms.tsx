import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useGlobalTheme } from "@/utils/themeContext";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import React from "react";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { format } from "timeago.js";
import MoreHoriz from "@mui/icons-material/MoreHoriz";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import { events, linkStates, socialLinks } from "@/constants";
import CardContent from "@mui/material/CardContent";
import {
  AnnouncementFetched,
  CommentFetched,
  EventFetched,
  EventTypes,
  LinkType,
} from "@/types";
import Image from "next/image";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useRouter } from "next/navigation";
import Divider from "@mui/material/Divider";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import LanguageIcon from "@mui/icons-material/Language";
import EmailIcon from "@mui/icons-material/Email";
import Menu from "@mui/material/Menu";
import { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { SocialIconsTypes } from "@/types";
import { Prose } from "./molecules";
import { Chip } from "@mui/material";
import { useGetCommunities } from "@/utils/hooks/useCommunity";
import { useDeleteEvent, useLikeEvent } from "@/utils/hooks/useEvents";
import toast from "react-hot-toast";
import { useIsCommunityUser, useIsOwner } from "./functions";
import { useAuth } from "@/utils/AuthContext";
import {
  useAddView,
  useDeleteAnnouncement,
} from "@/utils/hooks/useAnnouncements";
import Socials from "../utils/Socials";

export const NavigationButton = ({
  handleBack,
  handleFront,
  currentIndex,
  max,
}: {
  handleBack: () => void;
  handleFront: () => void;
  currentIndex: number;
  max: number;
}) => {
  const { colors } = useGlobalTheme();
  return (
    <div className="flex gap-1 items-center">
      <Box
        aria-label="Back"
        onClick={handleBack}
        bgcolor={currentIndex === max ? colors.indigo[500] : ""}
        className=" w-[25px]
        h-[25px] rounded-sm flex items-center cursor-pointer opacity-90 justify-center"
      >
        <ArrowBackIosNewIcon
          sx={{
            fontSize: "15px",
          }}
        />
      </Box>

      <Box
        aria-label="Back"
        onClick={handleBack}
        bgcolor={!(currentIndex >= max) ? colors.indigo[500] : ""}
        className="w-[25px] h-[25px] opacity-90 rounded-sm flex items-center justify-center cursor-pointer"
      >
        <ArrowForwardIosIcon
          sx={{
            fontSize: "15px",
          }}
        />
      </Box>
    </div>
  );
};
export const SideScroll = ({
  handleBack,
  handleFront,
}: {
  handleBack: () => void;
  handleFront: () => void;
}) => {
  const { colors } = useGlobalTheme();
  return (
    <div className="flex gap-1 items-center">
      <Box
        aria-label="Back"
        onClick={handleBack}
        bgcolor={colors.indigo[500]}
        className=" w-[20px]
        h-[20px] rounded-sm flex items-center cursor-pointer opacity-90 justify-center"
      >
        <ArrowBackIosNewIcon
          sx={{
            fontSize: "10px",
          }}
        />
      </Box>

      <Box
        aria-label="Back"
        onClick={handleFront}
        bgcolor={colors.indigo[500]}
        className="w-[20px] h-[20px] opacity-90 rounded-sm flex items-center justify-center cursor-pointer"
      >
        <ArrowForwardIosIcon
          sx={{
            fontSize: "10px",
          }}
        />
      </Box>
    </div>
  );
};

export const CardScroll = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = React.useRef<HTMLInputElement>(null);
  const scrollLeft = () => {
    console.log("scroll left");
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.8;
      containerRef.current.scrollBy({
        top: 0,
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.8;
      containerRef.current.scrollBy({
        top: 0,
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };
  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.scrollWidth);
      }
    };

    const updateScrollPosition = () => {
      if (containerRef.current) {
        setScrollPosition(containerRef.current.scrollLeft);
      }
    };

    window.addEventListener("resize", updateContainerWidth);
    containerRef.current?.addEventListener("scroll", updateScrollPosition);

    updateContainerWidth();
    updateScrollPosition();

    return () => {
      window.removeEventListener("resize", updateContainerWidth);
      containerRef.current?.removeEventListener("scroll", updateScrollPosition);
    };
  }, []);
  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between">
        <Typography variant="h5">{title}</Typography>
        <SideScroll handleFront={scrollRight} handleBack={scrollLeft} />
      </div>
      <div className="w-full overflow-hidden relative">
        <div
          className={`flex gap-4 my-5 py-2 scroll-smooth min-h-[200px]  pl-[4px] pr-10
            overflow-x-scroll scrollbar-none  `}
          ref={containerRef}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
export const SocialIcons = ({
  comments,
  likes,
  text,
}: {
  comments: number;
  likes: number;
  text?: boolean;
}) => {
  return (
    <div className="flex gap-3">
      <Box className="flex gap-1 items-center">
        <ChatBubbleOutlineIcon
          sx={{
            fontSize: "18px",
          }}
        />
        <Typography variant="body2" fontSize="15px">
          {comments}
          {text && " Comments"}
        </Typography>
      </Box>

      <Box className="flex gap-1 items-center">
        <FavoriteBorderIcon
          sx={{
            fontSize: "18px",
          }}
        />
        <Typography variant="body2" fontSize="15px">
          {likes} {text && " Likes"}
        </Typography>
      </Box>
      <Divider />
    </div>
  );
};
export const CustomCard = ({ event }: { event: EventFetched }) => {
  const { colors } = useGlobalTheme();
  const router = useRouter();
  const { data: communities } = useGetCommunities();
  const community = communities?.find((i) => i._id === event.communityId);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { user } = useAuth();
  const { mutateAsync: deleteEvent } = useDeleteEvent();
  const { mutateAsync: likeEvent } = useLikeEvent();
  const [liked, setLiked] = useState(event.likes.includes(user._id) || false);

  const admin =
    useIsCommunityUser("admin", event.communityId) || event.userId === user._id;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEventDelete = async () => {
    console.log("delete");
    toast.promise(deleteEvent(event._id), {
      loading: "Deleting event...",
      success: "Event deleted successfully",
      error: "Error deleting event",
    });
  };
  const handleLike = async () => {
    setLiked(!liked);
    await likeEvent({
      id: event._id,
      userId: user._id,
    });
  };
  return (
    <Card
      className="min-w-[300px] cursor-pointer"
      onClick={() => router.push("/events/" + event._id)}
    >
      <CustomCardHeader
        createdAt={event.createdAt}
        name={event.user.name}
        profileImage={event.user.profileImage}
        link={`/profile/${event.userId}`}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            router.push("/profile/" + event.userId);
          }}
        >
          Profile
        </MenuItem>
        {admin && (
          <>
            <MenuItem onClick={handleEventDelete}>Delete</MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                router.push("/events/" + event._id + "/edit");
              }}
            >
              Edit
            </MenuItem>
          </>
        )}
      </CustomCardHeader>
      <CardMedia
        component="img"
        height="194"
        image={event.coverImage}
        alt="cover image"
      />

      <CardContent>
        <div className="flex flex-col gap-2">
          <Typography variant="h6" className="flex-1">
            {event.title}
          </Typography>
          <Chip
            label={community ? community.title : "School"}
            className="w-fit"
            color="secondary"
            size="small"
          />
        </div>
      </CardContent>

      <CardActions
        disableSpacing
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex w-full justify-between items-center"
      >
        <Socials
          {...{
            likes: event.likes,
            type: "event",
            _id: event._id,
            owner: event.userId,
            ownerName: event.user.name,
          }}
        />
        <ShareLink clipLink={`${window.location.origin}/events/${event._id}`} />
      </CardActions>
    </Card>
  );
};
export const CustomCardHeader = ({
  children,
  profileImage,
  name,
  link,
  createdAt,
}: {
  children: React.ReactNode;
  profileImage?: string;
  name: string;
  createdAt: string;
  link?: string;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const { colors } = useGlobalTheme();
  const router = useRouter();
  return (
    <CardHeader
      avatar={
        <Avatar
          sx={{ bgcolor: colors.red[500] }}
          src={profileImage}
          alt={name}
          onClick={(e) => {
            e.stopPropagation();
            link && router.push(link);
          }}
        ></Avatar>
      }
      action={
        <IconButton
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={(e) => {
            e.stopPropagation();
            handleClick(e);
          }}
        >
          {" "}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={(e) => {
              e.stopPropagation();
            }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {children}
          </Menu>
          <MoreVertIcon />
        </IconButton>
      }
      title={name}
      subheader={format(createdAt)}
    />
  );
};
export const Post = ({ index }: { index: number }) => {
  const { colors } = useGlobalTheme();
  const router = useRouter();
  return (
    <Box
      bgcolor={colors.surface}
      borderRadius={1}
      className="space-y-2 cursor-pointer"
    >
      <Box p={1} className="flex justify-between items-center ">
        <Box className="flex gap-2 items-center">
          <Avatar src="/user.jpg" sizes="small" />
          <Typography variant="h5">Chari Rightson</Typography>
        </Box>
        <Typography variant="body2">15 min ago</Typography>
        <IconButton>
          <MoreHorizIcon
            sx={{
              fontSize: "20px",
            }}
          />
        </IconButton>
      </Box>
      <Link href={`/posts/${index}`}>
        {index % 2 ? (
          <Image
            src="/images/art.png"
            className="h-[300px] w-full object-cover"
            width={1000}
            height={1000}
            alt="image"
          />
        ) : null}
      </Link>
      <Box p={1}>
        <div className="cursor-pointer" onClick={() => router.push("/posts/1")}>
          <Typography variant="body2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa
            similique magnam eum, placeat ipsam, sequi ad nesciunt, ratione
            ducimus minus fugiat doloribus dolore autem quibusdam est
            perferendis molestias doloremque sed....
          </Typography>
        </div>
        <div className="flex justify-between py-2">
          <SocialIcons comments={10} likes={20} />
          <IconButton>
            <ShareIcon />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export const Announcement = ({
  announcement,
  setHiddenAnnouncements,
  status,
}: {
  announcement: AnnouncementFetched;
  setHiddenAnnouncements: React.Dispatch<React.SetStateAction<string[]>>;
  status: boolean;
}) => {
  const { colors } = useGlobalTheme();
  const { communitiesIn } = useAuth();
  const { mutateAsync: deleteAnnouncement } = useDeleteAnnouncement();
  const { mutateAsync: view } = useAddView();
  const { user } = useAuth();
  const isOwner = useIsOwner(announcement.userId);
  const handleAnnouncementDelete = async () => {
    toast.promise(deleteAnnouncement(announcement._id), {
      loading: "Deleting announcement...",
      success: "Announcement deleted successfully",
      error: "Error deleting announcement",
    });
  };
  const handleRead = async () => {
    view({ id: announcement._id, userId: user._id }).catch((e) => {
      console.log(e);
    });
  };
  return (
    <Box
      bgcolor={colors.surface}
      borderRadius={1}
      className="space-y-2 cursor-pointer"
    >
      <CustomCardHeader
        createdAt={announcement.createdAt}
        profileImage={announcement.user.profileImage}
        name={announcement.user.name}
        link={`/profile/${announcement.userId}`}
      >
        {isOwner && (
          <MenuItem onClick={handleAnnouncementDelete}>Delete</MenuItem>
        )}
      </CustomCardHeader>
      {announcement.coverImage && (
        <Image
          src={announcement.coverImage}
          className="h-[300px] w-full object-cover"
          width={1000}
          height={1000}
          alt="image"
        />
      )}
      <Box p={1} className="">
        <div className="cursor-pointer">
          <Typography variant="h4">{announcement.title}</Typography>
        </div>
        <div className="flex w-full justify-between mt-2 items-center ">
          <Chip
            label={
              communitiesIn.find((i) => i._id === announcement.communityId)
                ?.title
            }
            color="secondary"
            size="small"
          />
          {status && (
            <Button variant="contained" size="small" onClick={handleRead}>
              Mark as Read
            </Button>
          )}
        </div>
        <Prose>
          <div
            dangerouslySetInnerHTML={{
              __html: announcement.description,
            }}
          />
        </Prose>
      </Box>
    </Box>
  );
};

export function SocialButtons({ links }: { links: LinkType[] }) {
  const router = useRouter();
  const socialLinkIcons: SocialIconsTypes = {
    Facebook: <FacebookIcon sx={{ color: "#4267B2" }} />,
    Twitter: <TwitterIcon sx={{ color: "#55ACEE" }} />,
    Instagram: <InstagramIcon sx={{ color: "#E1306C" }} />,
    LinkedIn: <LinkedInIcon sx={{ color: "#0077B5" }} />,
    YouTube: <YouTubeIcon sx={{ color: "#FF0000" }} />,
    GitHub: <GitHubIcon sx={{ color: "#000" }} />,
    Website: <LanguageIcon sx={{ color: "#000" }} />,
    Gmail: <EmailIcon sx={{ color: "#D44638" }} />,
    WhatsApp: <WhatsAppIcon sx={{ color: "#25D366" }} />,
  };
  const handleLink = (socialLink: LinkType) => {
    const { name, link } = socialLink;

    if (name === "Gmail") {
      return `mailto:${link}`;
    } else if (name === "WhatsApp") {
      return `https://wa.me/${link}`;
    } else if (!link.startsWith("https://")) {
      return `https://${link}`;
    } else {
      return link;
    }
  };
  return (
    <>
      {links.map((socialLink) => {
        const { name } = socialLink;
        return (
          <Link href={handleLink(socialLink)}>
            <IconButton key={socialLink.name}>
              {socialLinkIcons[name]}
            </IconButton>
          </Link>
        );
      })}
    </>
  );
}

export const SelectSocialLinks = ({
  setFilledLinks,
  initialLinks,
}: {
  setFilledLinks: React.Dispatch<React.SetStateAction<LinkType[]>>;
  initialLinks?: LinkType[];
}) => {
  const [openLinks, setOpenLinks] = useState<
    {
      name: string;
      placeholder: string;
    }[]
  >([]);
  const [links, setLinks] = React.useState<(keyof SocialIconsTypes | string)[]>(
    []
  );
  const [linkValues, setLinkValues] = useState<LinkType[]>(linkStates);
  const handleChange = (event: SelectChangeEvent<typeof links>) => {
    const {
      target: { value },
    } = event;
    setLinks(typeof value === "string" ? value.split(",") : value);
  };
  useEffect(() => {
    setOpenLinks(socialLinks.filter((link) => links.includes(link.name)));
  }, [links]);
  const handleValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newLinks = linkValues.map((link) => {
      if (link.name === name) {
        return {
          ...link,
          link: value,
        };
      }
      return link;
    });
    setLinkValues(newLinks);
  };
  useEffect(() => {
    const filledLinks = linkValues.filter((link) => link.link !== "");
    setFilledLinks(filledLinks);
  }, [linkValues]);

  useEffect(() => {
    if (!initialLinks) return;
    const linksWithValues = linkValues.map((link) => {
      const userLink = initialLinks.find((i) => i.name === link.name);
      if (userLink) {
        return {
          ...link,
          link: userLink.link,
        };
      }
      return link;
    });
    setLinkValues(linksWithValues);
    const initial = socialLinks
      ?.filter((link) => initialLinks.find((i) => i.name === link.name))
      .map((link) => link.name);
    setLinks(initial);
  }, [initialLinks]);
  return (
    <div className="flex flex-col gap-5">
      <FormControl>
        <InputLabel id="social-links-label">Social Links</InputLabel>
        <Select
          labelId="social-links-label"
          id="social-links-label"
          multiple
          value={links}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {socialLinks.map(({ name }) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={links.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {openLinks.map((link, index) => {
        return (
          <FormControl fullWidth key={index}>
            <FormLabel>{link.name}</FormLabel>
            <TextField
              label={link.placeholder}
              variant="outlined"
              size="small"
              onChange={handleValues}
              name={link.name}
              value={linkValues.find((i) => i.name === link.name)?.link || ""}
              color="primary"
            />
          </FormControl>
        );
      })}
    </div>
  );
};
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
export const ShareLink = ({ clipLink }: { clipLink: string }) => {
  return (
    <IconButton
      aria-label="share"
      onClick={(e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(clipLink);
        toast.success("Copied Link to clipboard");
      }}
    >
      <ShareIcon />
    </IconButton>
  );
};
