import { EventAdd, EventFetched } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../AuthContext";
import toast from "react-hot-toast";

export const useAddEvent = () => {
  const queryClient = useQueryClient();
  return useMutation((event: EventAdd) => axios.post("/api/events", event), {
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });
};
export const useGetEvents = () => {
  const { user } = useAuth();
  return useQuery(
    ["events"],
    (): Promise<EventFetched[]> =>
      axios.get(`/api/events?userId=${user._id}`).then((res) => res.data),
    {
      enabled: !!user?._id,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => axios.delete(`/api/events?id=${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });
};
export const useLikeEvent = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, userId }: { id: string; userId: string }) =>
      axios.put(`/api/events/likes`, { id, userId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["events"]);
      },
      onError: () => {
        toast.error("Error liking event");
      },
    }
  );
};
export const useEditEvent = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (event: Partial<EventFetched>) => axios.put(`/api/events`, event),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["events"]);
      },
      onError: () => {
        toast.error("Error editing event");
      },
    }
  );
};

//user Events
export const useGetUserEvents = (userId?: string) => {
  return useQuery(
    ["events", userId],
    (): Promise<EventFetched[]> =>
      axios.get(`/api/events/user?userId=${userId}`).then((res) => res.data),
    {
      enabled: !!userId,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};
