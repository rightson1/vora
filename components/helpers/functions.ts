import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/utils/firebase";
import {
  AnnouncementFetched,
  CommunityFetched,
  EventFetched,
  PostFetched,
  eventStatus,
} from "@/types";
import { useAuth } from "@/utils/AuthContext";
import { useEffect, useState } from "react";
export const uploadFile = (file: File, name: string, folder: string) => {
  const fileRef = ref(storage, `/${folder}/${name}`);
  return uploadBytes(fileRef, file)
    .then((res) => getDownloadURL(res.ref))
    .catch((err) => {
      console.error(err);
      throw err;
    });
};
export const deleteFile = async (url: string) => {
  try {
    const deleteRef = ref(storage, url);
    await deleteObject(deleteRef).then(() => {
      return true;
    });
  } catch (err) {
    console.log(err);
    return true;
  }
};
export const useIsCommunityUser = (
  type: "member" | "admin",
  id?: string
): boolean => {
  const { user, communitiesIsAdmin, communitiesIn } = useAuth();
  const userId = user?._id;
  if (!id) return false;
  if (type === "admin") {
    const community = communitiesIsAdmin.find((c) => c._id === id);
    if (!community) return false;
    const member = community.users.find((u) => u._id === userId);
    if (!member) return false;
    return true;
  } else {
    const community = communitiesIn.find((c) => c._id === id);
    if (!community) return false;
    const member = community.users.find((u) => u._id === userId);
    if (!member) return false;
    return true;
  }
};
export const communitiesInIds = (communitiesIn: CommunityFetched[]): string[] =>
  communitiesIn.map((c) => c._id);
export const scrollToParentComment = (parentCommentId: string) => {
  const parentCommentElement = document.getElementById(parentCommentId);

  if (parentCommentElement) {
    // Calculate the offset to center the element in the viewport
    const offset = parentCommentElement.offsetHeight / 2;

    // Scroll to the element, subtracting the offset
    parentCommentElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
};
export const useEventsCount = (
  status: eventStatus,
  events?: EventFetched[]
) => {
  const [eventsCount, setEventsCount] = useState(0);
  useEffect(() => {
    if (!events) {
      setEventsCount(0);
    } else {
      setEventsCount(
        events?.filter((event) => event.status === status)?.length
      );
    }
  }, [events]);
  return eventsCount;
};

export const useBlogsCount = (blogs?: PostFetched[]) => {
  const [blogsCount, setBlogsCount] = useState(0);
  const { user } = useAuth();
  useEffect(() => {
    if (!blogs) {
      setBlogsCount(0);
    } else {
      setBlogsCount(
        blogs.filter((blog) => !blog.views.includes(user?._id)).length
      );
    }
  }, [blogs]);
  return blogsCount;
};
///count announcements where announcement.views does not include user._id
export const useAnnouncementsCount = (
  announcements?: AnnouncementFetched[]
) => {
  const [announcementsCount, setAnnouncementsCount] = useState(0);
  const { user } = useAuth();
  useEffect(() => {
    console.log(announcements);
    if (!announcements) {
      setAnnouncementsCount(0);
    } else {
      setAnnouncementsCount(
        announcements.filter(
          (announcement) => !announcement.views?.includes(user?._id)
        ).length
      );
    }
  }, [announcements]);
  return announcementsCount;
};

export const useIsOwner = (userId: string) => {
  const { user } = useAuth();
  return user._id === userId;
};
