import { SocialIconsTypes } from "@/types";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";

export const quickLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Contact",
    link: "/contact",
  },
  {
    title: "Contact",
    link: "/contact",
  },
  {
    title: "Contact",
    link: "/contact",
  },
  {
    title: "Contact",
    link: "/contact",
  },
];
export const events = [
  {
    name: "First Year Orientations on Zoom",
    likes: 1,
    comments: 3,
    date: "Thur 12th Aug",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod",

    image: "/images/1.png",
    author: "John Doe",
  },
  {
    name: "Hike to Ngong Hills, Please Register",
    likes: 1,
    comments: 6,
    date: "Sat 14th Aug",
    image: "/images/2.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod",
    author: "Rightson Tole",
  },
  {
    name: "Christian Union Club Meeting",
    likes: 1,
    comments: 3,
    date: "Sat 14th Aug",
    image: "/images/3.png",
    author: "Charles Mwathi",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod",
  },
];
export const clubs = [
  {
    name: "Christian Union",
    image: "/images/1.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod",
  },
  {
    name: "Theater Club",
    image: "/images/2.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod",
  },
  {
    name: "Football Club",
    image: "/images/3.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod",
  },
  {
    name: "Tech Club",
    image: "/images/1.png",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod",
  },
];
export const editorColors = [
  "#25262b",
  "#fff",
  "#868e96",
  "#fa5252",
  "#e64980",
  "#be4bdb",
  "#7950f2",
  "#4c6ef5",
  "#228be6",
  "#15aabf",
  "#12b886",
  "#40c057",
  "#82c91e",
  "#fab005",
  "#fd7e14",
];
export const socialLinks: {
  name: keyof SocialIconsTypes;
  placeholder: string;
}[] = [
  {
    name: "Facebook",
    placeholder: "https://www.facebook.com/username",
  },
  {
    name: "Twitter",
    placeholder: "https://twitter.com/username",
  },
  {
    name: "Instagram",
    placeholder: "https://www.instagram.com/username",
  },
  {
    name: "LinkedIn",
    placeholder: "https://www.linkedin.com/in/username",
  },
  {
    name: "YouTube",
    placeholder: "https://www.youtube.com/channel/username",
  },
  {
    name: "GitHub",
    placeholder: "https://github.com/username",
  },
  {
    name: "Website",
    placeholder: "https://www.example.com",
  },
  {
    name: "Gmail",
    placeholder: "user@gmail.com",
  },
  {
    name: "WhatsApp",
    placeholder: "+2547XXXXXXXX",
  },
];
export const linkStates: {
  name: keyof SocialIconsTypes;
  link: string;
}[] = [
  {
    name: "Facebook",
    link: "",
  },
  {
    name: "Twitter",
    link: "",
  },
  {
    name: "Instagram",
    link: "",
  },
  {
    name: "LinkedIn",
    link: "",
  },
  {
    name: "YouTube",
    link: "",
  },
  {
    name: "GitHub",
    link: "",
  },
  {
    name: "Website",
    link: "",
  },
  {
    name: "Gmail",
    link: "",
  },
  {
    name: "WhatsApp",
    link: "",
  },
];
