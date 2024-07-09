"use client";
import { createContext, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-hot-toast";
import { auth } from "./firebase";

import axios from "axios";
import { useState } from "react";
import { db } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import { Admin, CommunityFetched, User } from "@/types";
import { useFetchUser } from "./hooks/useUser";
import { useGetCommunities } from "./hooks/useCommunity";
const AuthContext = createContext({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [admin, setAdmin] = useState<Admin | {} | null>({});
  const [user, setUser] = useState<User | null>(null);
  const { data: communities } = useGetCommunities();
  const [comminitiesIn, setCommunitiesIn] = useState<CommunityFetched[]>([]);
  const [communitiesIsAdmin, setCommunitiesIsAdmin] = useState<
    CommunityFetched[]
  >([]);
  const fetchUser = async (uid: string) => {
    await axios
      .get(`/api/user?uid=${uid}`)
      .then((res) => {
        const user = res.data;
        if (user) {
          setUser(res.data);
          localStorage.setItem("user", JSON.stringify(user));
        } else {
          localStorage.removeItem("user");
          setUser(null);
          setAdmin(null);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const userString =
      typeof localStorage !== "undefined" && localStorage.getItem("user");
    const localUser: User | null = userString ? JSON.parse(userString) : null;
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAdmin({
          uid: user.uid,
          email: user.email,
          displayNavme: user.displayName,
          photoURL: user.photoURL,
        });
        if (localUser?.uid === user.uid) {
          setUser(localUser);
        } else {
          fetchUser(user.uid);
        }
      } else {
        setAdmin(null);
        setUser(null);
      }
    });
    // setLoading(false);
    return () => {
      unsub();
    };
  }, []);
  const logout = async () => {
    const log = async () => {
      localStorage.removeItem("user");
      await auth.signOut();
    };
    toast.promise(log(), {
      loading: "Logging out...",
      success: "Logged out successfully",
      error: "Could not log out, you stuck here forever",
    });
  };
  useEffect(() => {
    if (communities && user) {
      const comminitiesIn = communities.filter(
        (community) =>
          // community.users.map((member) => member._id !== user._id)
          community.users.some(
            (member) => member._id === user._id && member.status === "active"
          ) || community.main
      );
      const communitiesIsAdmin = communities.filter((community) =>
        community.users.some(
          (member) => member._id === user._id && member.role === "admin"
        )
      );
      setCommunitiesIsAdmin(communitiesIsAdmin);
      setCommunitiesIn(comminitiesIn);
    }
  }, [communities, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        fetchUser,
        logout,
        admin,
        communitiesIn: comminitiesIn,
        communitiesIsAdmin: communitiesIsAdmin,
        setUser,
        setAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

interface AuthContextProps {
  user: User;
  admin: Admin;
  fetchUser: (uid: string) => Promise<void>;
  logout: () => Promise<void>;
  communitiesIn: CommunityFetched[];
  communitiesIsAdmin: CommunityFetched[];
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setAdmin: React.Dispatch<React.SetStateAction<Admin | {} | null>>;
}

export const useAuth = (): AuthContextProps => {
  const authContext = useContext(AuthContext) as AuthContextProps;
  return authContext;
};
