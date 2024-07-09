import { CommentFetched } from "./../../types/index";
import { CommentAdd } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddComment = () => {
  const queryClient = useQueryClient();
  let parent = "";
  return useMutation(
    (comment: CommentAdd) => {
      parent = comment.parent;
      return axios.post(`/api/comments`, comment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", parent]);
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );
};
export const useGetComments = (parent: string) => {
  return useQuery(
    ["comments", parent],
    (): Promise<CommentFetched[]> =>
      axios.get(`/api/comments?parent=${parent}`).then((res) => res.data),
    {
      refetchInterval: 1000 * 60 * 5,
      enabled: !!parent,
    }
  );
};
//delete comment
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  let parentId = "";
  return useMutation(
    ({ id, parent }: { id: string; parent: string }) => {
      parentId = parent;

      return axios.delete(`/api/comments?id=${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["comments", parentId]);
        queryClient.invalidateQueries(["commentsCount", parentId]);
        queryClient.invalidateQueries(["comments"]);
      },
    }
  );
};
export const useCommentCount = (parent: string) => {
  return useQuery(
    ["commentsCount", parent],
    (): Promise<number> =>
      axios.get(`/api/comments/count?parent=${parent}`).then((res) => res.data),
    {
      refetchInterval: 1000 * 60 * 5,
      enabled: !!parent,
    }
  );
};
