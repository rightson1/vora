"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { auth } from "@/utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import { useAddUser } from "@/utils/hooks/useUser";
import axios from "axios";
import { useAuth } from "@/utils/AuthContext";
import { User } from "@/types";
import Title from "../(main)/components/Title";

const Login = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const { admin, user } = useAuth();

  const { mutateAsync } = useAddUser();

  const signInWithGoogle = async () => {
    const signIn = async () =>
      await signInWithPopup(auth, provider)
        .then(async (result) => {
          const { displayName, email, uid } = result.user;
          if (displayName && email && uid) {
            const user: User = await axios
              .get(`/api/user?uid=${uid}`)
              .then((res) => res.data);
            if (!user) {
              await mutateAsync({
                displayName,
                email,
                uid,
                name: displayName,
                fakeName: `user-${Math.random().toString(36).substring(4)}`,
              });
            }
          } else {
            throw new Error("Could not sign in");
          }
        })
        .then(() => {
          auth.currentUser?.getIdToken(true);
          auth.currentUser?.reload();

          const prevPath = localStorage.getItem("path");
          localStorage.removeItem("path");
          window.location.href = prevPath || "/";
        })
        .catch((error) => {
          console.log(error);
          toast.error(JSON.stringify(error.message || error));
          throw new Error(error);
        });
    toast.promise(signIn(), {
      loading: "Signing in...",
      success: "Signed in successfully",
      error: "Could not sign in",
    });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 z-[2]">
      <Title title="Login" />
      <div className="bg-[#090E24] h-screen w-full relative overflow-hidden z-[2] p-4">
        <Image src="/vora.svg" width={100} height={50} alt="logo" />
        <div
          className="h-full flex  
         flex-col items-center justify-center  text-white gap-5
           "
        >
          <h1 className="text-[40px] -mt-20 md:text-[60px] text-center font-bubble">
            Connect, Learn & <span className="text-[#703ED8]">Innovate </span>
            with Vora.
          </h1>
          <p className=" text-center">
            Welcome to our student-centric web app, where you can connect,
            engage, and thrive in both the Club and School Sections, fostering a
            vibrant campus community.
          </p>
          <button
            onClick={signInWithGoogle}
            className="font-bubble flex items-center gap-3 cursor-pointer mt-5 login-button text-white text-2xl p-2 px-4 rounded-full"
          >
            Click Click bang, Lets Go!!!
            {/* KeyboardArrowRightIcon p-1 white rounded-full */}
            <KeyboardArrowRightIcon className="p-1 text-black rounded-full bg-white" />
          </button>
        </div>

        <div
          className="absolute top-10 left-10 w-[150px] h-[150px] blur-[70px] 
          md:w-[200px] md:h-[200px] 
         md:blur-[100px] bg-[#703ED8] z-[-1] "
        ></div>
        <div
          className="absolute bottom-10 right-10 w-[150px] h-[150px] blur-[70px] 
          md:w-[200px] md:h-[200px] 
         md:blur-[100px] bg-[#DA5988] z-[-1]"
        ></div>
      </div>
      <div
        className="h-screen max-h-screen overflow-hidden w-full
       bg-[#F5F2FD] p-2 py-4 gap-9 hidden md:flex  flex-col items-center justify-center"
      >
        <div className="w-full flex justify-end">
          {/* black button (contact us) no border radius*/}
          <button className="bg-black text-white w-[130px] p-3 rounded-none border-none">
            Contact Us
          </button>
        </div>
        <div className="h-full w-[85%]  max-w-[500px] xl:max-w-[600px] flex justify-center items-center ">
          {info.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                display: "none",
              }}
              animate={{
                opacity: currentIndex === index ? 1 : 0,
                display: currentIndex === index ? "flex" : "none",
              }}
              className="w-full h-full  items-center justify-center flex-col   "
            >
              <div className="flex flex-col w-full h-full items-center justify-centerbg-red-100 ">
                <div className="flex-col w-full items-center  ">
                  {/* enter first */}
                  <motion.div
                    animate={{
                      y: currentIndex === index ? 0 : -100,
                    }}
                    // transition={{ delay: 0.1 }}
                    className=" bg-[#703ED8] py-1 w-[85%]   flex justify-center items-center gap-5 "
                  >
                    <p className="text-white text-[14px] font-bold p-2">
                      {item.name}
                    </p>
                    <Brightness1Icon className="text-white text-[14px]" />
                    <p className="text-white text-[14px] font-bold p-2">
                      {item.sub}
                    </p>
                  </motion.div>
                  <div className="flex w-full h-full  max-h-[350px] xl:max-h-[380px]    ">
                    {/* enter second  */}
                    <div className=" w-[85%]">
                      <motion.img
                        transition={{ delay: 0.1 }}
                        animate={{
                          x: currentIndex === index ? 0 : -100,
                        }}
                        src={item.img}
                        alt=""
                        className="w-full h-full object-cover  "
                      />
                    </div>
                    <motion.div
                      transition={{ delay: 0.3 }}
                      animate={{
                        x: currentIndex === index ? 0 : 400,
                      }}
                      className="h-full w-[15%]  bg-[#090E24]"
                    ></motion.div>
                  </div>
                </div>
                {/* Enter 4th */}
                <div className="flex flex-col flex-[2] w-full items-start justify-start   ">
                  <motion.div
                    transition={{ delay: 0.4 }}
                    animate={{
                      y: currentIndex === index ? 0 : 400,
                    }}
                    className="flex-col flex  w-full
                justify-start items-center "
                  >
                    <h4 className="font-bold text-xl text-black mt-2 text-start">
                      {item.info}
                    </h4>
                    <div className=" flex w-full  items-center justify-start gap-2 ">
                      {/* 2 line, 3px thick line-text-line */}
                      <div className="w-full h-[4px] bg-[#090E24]"></div>
                      <span className="font-bold text-xl text-black ">2/4</span>
                      <div className="w-full h-[4px] bg-[#090E24]"></div>
                    </div>
                  </motion.div>
                  <div className="w-full  justify-end flex gap-2 cursor-pointer">
                    <ChevronLeftIcon
                      onClick={() => {
                        setCurrentIndex(
                          currentIndex === 0
                            ? info.length - 1
                            : currentIndex - 1
                        );
                      }}
                      className="p-1 text-black rounded-full bg-white transition-all duration-300 hover:bg-gray-200"
                    />
                    <KeyboardArrowRightIcon
                      onClick={() => {
                        setCurrentIndex(
                          currentIndex === info.length - 1
                            ? 0
                            : currentIndex + 1
                        );
                      }}
                      className="p-1 text-black rounded-full bg-white transition-all duration-300 hover:bg-gray-200"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
const info = [
  {
    name: "Blogs and Articles",
    sub: "Any Student",
    img: "/login/1.png",
    info: "Write your own blogs and articles",
  },
  {
    name: "Propose Events",
    sub: "Any Student",
    img: "/login/2.png",
    info: "Propose events and view upcoming events",
  },
  {
    name: "Join a Create Communities",
    sub: "Any Student",
    img: "/login/3.png",
    info: "Join a community or create your own",
  },
];
export default Login;
