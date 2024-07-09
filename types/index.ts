import { events } from "@/constants";
import React from "react";
export type SocialIconsTypes = {
  Facebook: JSX.Element;
  Twitter: JSX.Element;
  Instagram: JSX.Element;
  LinkedIn: JSX.Element;
  YouTube: JSX.Element;
  GitHub: JSX.Element;
  Website: JSX.Element;
  Gmail: JSX.Element;
  WhatsApp: JSX.Element;
};

export interface childrenProps {
  children: React.ReactNode;
}
export type mode = "light" | "dark";
type Shades = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type ColorShades = {
  [key in Shades]: string;
};

export interface TokenColors {
  background: string;
  surface: string;
  active: string;
  white: string;
  indigo: ColorShades;
  green: ColorShades;
  red: ColorShades;
  text: string;
  textSecondary: string;
  card: string;
}
export interface openProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface menuType {
  name: string;
  links: {
    name: string;
    icon: React.JSX.Element;
    info?: string;
    link: string;
    active?: boolean;
  }[];
}
export type EventTypes = (typeof events)[0];
export interface Admin {
  email: string;
  uid: string;
  displayName: string;
  photoURL?: string;
  name?: string;
}
export type LinkType = {
  name: keyof SocialIconsTypes;
  link: string;
};
export interface User extends Admin {
  name: string;
  _id: string;
  links: LinkType[];
  coverImage?: string;
  bio?: string;
  profileImage?: string;
  profession?: string;
  fakeName: string;
}
export type communityMember = {
  role: "admin" | "member";
  status: "active" | "pending" | "banned";
  userId: string;
};

export interface CommunityType {
  title: string;
  description: string;
  profileImage: string;
  coverImage: string;
  visibility: "private" | "public";
  links: LinkType[];
  members: communityMember[];
  createdAt: string;
  _id: string;
}
export interface CommunityCreate
  extends Omit<CommunityType, "_id" | "createdAt"> {
  // Any additional fields you want to include in the CommunityCreate interface
}

export type communityUser = Omit<communityMember, "userId"> & {
  profileImage: string;
  name: string;
  _id: string;
};

export interface CommunityFetched extends Omit<CommunityType, "members"> {
  _id: string;
  users: communityUser[];
  main?: boolean;
}
export interface CommunityMemberEdit {
  communityId: string;
  userId: string;
  role: "admin" | "member";
  status: "active" | "pending" | "banned";
}
export interface CommunityImageAdd {
  communityId: string;
  url: string;
  userId: string;
  name: string;
  description: string;
}
export interface CommunityImageFetched extends CommunityImageAdd {
  _id: string;
  createdAt: string;
}
export type eventStatus =
  | "approved"
  | "pending"
  | "rejected"
  | "unpublished"
  | "past";
export interface EventAdd {
  title: string;
  description: string;
  link?: string;
  likes: string[];
  userId: string;
  communityId: string;
  eventDate?: string;
  coverImage: string;
  status: eventStatus;
  venue?: string;
}
export interface EventFetched extends EventAdd {
  _id: string;
  createdAt: string;
  user: User;
}
export type minUser = Pick<User, "name" | "_id" | "profileImage">;
export type blogStatus = "published" | "unpublished";
export interface PostAdd {
  title: string;
  description: string;
  likes: string[];
  userId: string;
  communityId: string;
  coverImage: string;
  status: blogStatus;
}
export interface PostFetched extends PostAdd {
  _id: string;
  createdAt: string;
  user: minUser;
  views: string[];
}
export interface AnnouncementAdd {
  title: string;
  description: string;
  views: string[];
  userId: string;
  communityId: string;
  coverImage?: string;
}

export interface AnnouncementFetched extends AnnouncementAdd {
  _id: string;
  createdAt: string;
  user: minUser;
}
export interface CommentAdd {
  parent: string;
  userId: string;
  comment: string;
  parentCommentId?: string;
}
export interface CommentFetched extends CommentAdd {
  user: Pick<User, "name" | "_id" | "profileImage">;
  createdAt: string;
  _id: string;
  comments: number;
  parentComment: CommentFetched | null;
}
export interface NotificationAdd {
  title: string;
  link: string;
  sender: string;
  receiver: string;
}
export interface NotificationFetched extends NotificationAdd {
  id: string;
}
export interface LectureAdd {
  name: String;
  description: String;
  rating: {
    rating: number;
    ratingId: string;
  }[];
}
export interface LectureFetched extends Omit<LectureAdd, "rating"> {
  _id: string;
  createdAt: string;
  averageRating: number;
}
export interface RatingAdd {
  rating: number;
  ratingId: string;
}
export interface PrivateCommentAdd {
  name: string;
  parent: string;
  comment: string;
  parentCommentId?: string;
  rating?: RatingAdd;
}
export interface PrivateCommentFetched
  extends Omit<PrivateCommentAdd, "rating"> {
  _id: string;
  createdAt: string;
}
