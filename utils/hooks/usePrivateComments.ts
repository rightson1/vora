import { PrivateCommentAdd, PrivateCommentFetched } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddPcomment = () => {
  const queryClient = useQueryClient();
  let parent = "";

  return useMutation(
    (comment: PrivateCommentAdd) => {
      parent = comment.parent;

      return axios.post(`/api/pcomments`, comment);
    },
    {
      onSuccess: () => {
        console.log(parent);
        queryClient.refetchQueries(["pcomments", parent]);
        queryClient.invalidateQueries(["pcomments", parent]);
        queryClient.invalidateQueries(["lecture", parent]);
        queryClient.invalidateQueries(["lectures"]);
      },
    }
  );
};
const fetchComments = (parent: string): Promise<PrivateCommentFetched[]> =>
  axios.get(`/api/pcomments?parent=${parent}`).then((res) => res.data);
export const useGetPcomments = (parent: string) => {
  return useQuery(["pcomments", parent], () => fetchComments(parent), {
    refetchInterval: 1000 * 60 * 5,
    enabled: !!parent,
  });
};
//delete comment
export const useDeletePcomment = () => {
  const queryClient = useQueryClient();
  let parentId = "";
  return useMutation(
    ({ id, parent }: { id: string; parent: string }) => {
      parentId = parent;

      return axios.delete(`/api/pcomments?id=${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["pcomments", parentId]);
      },
    }
  );
};
export const usePcommentCount = (parent: string) => {
  return useQuery(
    ["commentsCount", parent],
    (): Promise<number> =>
      axios
        .get(`/api/pcomments/count?parent=${parent}`)
        .then((res) => res.data),
    {
      refetchInterval: 1000 * 60 * 5,
      enabled: !!parent,
    }
  );
};
