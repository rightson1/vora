import { PostAdd, PostFetched } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { toast } from "react-hot-toast";

export const useAddPost = () => {
  const queryClient = useQueryClient();
  return useMutation((post: PostAdd) => axios.post("/api/posts", post), {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
};
export const useGetPosts = () => {
  const { communitiesIn, user } = useAuth();
  const communitiesIds = communitiesIn.map((community) => community._id);
  return useQuery(
    ["posts"],
    (): Promise<PostFetched[]> =>
      axios
        .get(`/api/posts?communitiesIds=${communitiesIds}`)
        .then((res) => res.data),
    {
      enabled: !!user?._id && communitiesIds.length > 0,

      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation((id: string) => axios.delete(`/api/posts?id=${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
};
export const useLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, userId }: { id: string; userId: string }) =>
      axios.put(`/api/posts/likes`, { id, userId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
      onError: () => {
        toast.error("Error liking post");
      },
    }
  );
};
export const useAddView = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, userId }: { id: string; userId: string }) =>
      axios.put(`/api/posts/views`, { id, userId }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
      onError: () => {
        toast.error("Error liking post");
      },
    }
  );
};
export const useEditPost = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (post: Partial<PostFetched>) => axios.put(`/api/posts`, post),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["posts"]);
      },
      onError: () => {
        toast.error("Error editing post");
      },
    }
  );
};
export const useGetCommunityPosts = (communityId: string) => {
  return useQuery(
    ["posts", communityId],
    (): Promise<PostFetched[]> =>
      axios
        .get(`/api/posts/community?communitiesId=${communityId}`)
        .then((res) => res.data),
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};
//user posts
export const useGetUserPosts = (userId: string) => {
  return useQuery(
    ["posts", userId],
    (): Promise<PostFetched[]> =>
      axios.get(`/api/posts/user?userId=${userId}`).then((res) => res.data),
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};
