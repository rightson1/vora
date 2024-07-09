import {
  CommunityCreate,
  CommunityFetched,
  CommunityMemberEdit,
  CommunityType,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddCommunity = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (community: CommunityCreate) => axios.post("/api/communities", community),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["communities"]);
      },
    }
  );
};

export const useGetCommunities = () =>
  useQuery(
    ["communities"],
    (): Promise<CommunityFetched[]> =>
      axios.get("/api/communities").then((res) => res.data),
    {
      staleTime: 1000 * 60 * 60,
    }
  );
export const useEditCommunityMember = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (community: CommunityMemberEdit) =>
      axios.put(`/api/communities/members`, community),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["communities"]);
      },
    }
  );
};
export const useEditCommunity = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (community: Partial<CommunityType>) =>
      axios.put(`/api/communities`, community),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["communities"]);
      },
    }
  );
};
//add community member
export const useAddCommunityMember = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (community: CommunityMemberEdit) =>
      axios.post(`/api/communities/members`, community),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["communities"]);
      },
    }
  );
};
