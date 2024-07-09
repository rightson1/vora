import { AnnouncementAdd, AnnouncementFetched, PostFetched } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../AuthContext";
import toast from "react-hot-toast";

export const useAddAnnouncement = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (announcement: AnnouncementAdd) =>
      axios.post("/api/announcements", announcement),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["announcements"]);
      },
    }
  );
};

export const useGetAnnouncements = () => {
  const { communitiesIn, user } = useAuth();
  const communitiesIds = communitiesIn.map((community) => community._id);
  return useQuery(
    ["announcements"],
    (): Promise<AnnouncementFetched[]> =>
      axios
        .get(`/api/announcements?communitiesIds=${communitiesIds}`)
        .then((res) => res.data),
    {
      enabled: !!user?._id && communitiesIds.length > 0,

      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};
export const useDeleteAnnouncement = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (announcementId: string) =>
      axios.delete(`/api/announcements?id=${announcementId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["announcements"]);
      },
    }
  );
};
export const useAddView = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, userId }: { id: string; userId: string }) =>
      axios.put(`/api/announcements/views`, { id, userId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["announcements"]);
      },
      onError: () => {
        toast.error("Error");
      },
    }
  );
};
