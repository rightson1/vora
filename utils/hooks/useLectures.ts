import { LectureAdd, LectureFetched } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useAddLecture = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (lecture: LectureAdd) => axios.post("/api/lectures", lecture),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["lectures"]);
      },
    }
  );
};
//get lectures by community id
export const useGetLectures = () => {
  return useQuery(
    ["lectures"],
    (): Promise<LectureFetched[]> =>
      axios.get(`/api/lectures`).then((res) => res.data),
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};
//editLecture
export const useEditLecture = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (lecture: Partial<LectureFetched>) => axios.put(`/api/lectures`, lecture),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["lectures"]);
      },
    }
  );
};
//get lecture by id
export const useGetLecture = (_id: string) => {
  return useQuery(
    ["lecture", _id],
    (): Promise<LectureFetched> =>
      axios.get(`/api/lectures/lecture?_id=${_id}`).then((res) => res.data),
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};
