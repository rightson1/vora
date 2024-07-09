import { CommunityImageAdd, CommunityImageFetched } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddImage = () => {
  const queryClient = useQueryClient();
  let parent = "";
  return useMutation(
    (image: CommunityImageAdd) => {
      parent = image.communityId;
      return axios.post("/api/images", image);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["images", parent]);
        queryClient.invalidateQueries(["images"]);
      },
    }
  );
};
//get images by community id
export const useGetImages = (id: string) => {
  return useQuery(
    ["images", id],
    (): Promise<CommunityImageFetched[]> =>
      axios.get(`/api/images?communityId=${id}`).then((res) => res.data),
    {
      enabled: !!id,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};
//editImage
export const useEditImage = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (image: Partial<CommunityImageFetched>) => axios.put(`/api/images`, image),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["images"]);
      },
    }
  );
};
//export delete image
export const useDeleteImage = () => {
  const queryClient = useQueryClient();
  let parent = "";
  return useMutation(
    (id: string) => {
      parent = id;
      return axios.delete(`/api/images?id=${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["images", parent]);
        queryClient.invalidateQueries(["images"]);
      },
    }
  );
};
