import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Admin, User } from "@/types";
import { useAuth } from "../AuthContext";
export const useAddUser = () => {
  type data = Admin & {
    fakeName: string;
  };
  return useMutation((user: data) => axios.post("/api/user", user));
};
export const useFetchUser = (uid: string) => {
  return useQuery(
    ["user"],
    (): Promise<User> =>
      axios.get(`/api/user?uid=${uid}`).then((res) => res.data),
    {
      enabled: !!uid,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};
export const useUpdateUser = () => {
  const updateUser = (body: Partial<User>) =>
    axios.put("/api/user", {
      body,
    });
  return useMutation(updateUser);
};
//user deleteAccount using id
export const useDeleteUser = () => {
  const { logout } = useAuth();
  const {
    user: { _id },
  } = useAuth();
  return useMutation(() => axios.delete(`/api/user?_id=${_id}`), {
    onSuccess: () => {
      logout();
    },
  });
};
//
export const useGetUser = (id: string) => {
  return useQuery(
    ["user", id],
    (): Promise<User> =>
      axios.get(`/api/user/id?_id=${id}`).then((res) => res.data),
    {
      enabled: !!id,
      staleTime: 1000 * 60 * 60 * 24,
    }
  );
};
