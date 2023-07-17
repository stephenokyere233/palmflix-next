/* eslint-disable react-hooks/exhaustive-deps */
import { AppContext } from "@/context";
import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleAuthProvider,
  UserCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { firebaseAuth } from "@/config/firebase.config";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { onAuthenticationSuccess } from "@/services/auth.service";
import ModalLayout from "../layout/ModalLayout";
import { BiX } from "react-icons/bi";
import { fetchBookmarks } from "@/services/bookmarks.service";
import PasswordReset from "./reset.modal";

const googleProvider = new GoogleAuthProvider();

const LoginModal = () => {
  const router = useRouter();
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    setShowSignupModal,
    setShowLoginModal,
    setBookmarkedMovies,
    setSavedMovieIDS,
    showResetModal,
    setShowResetModal,
  } = useContext(AppContext);

  const getBookmarks = async () => {
    const { movieIDS_, savedMoviesData_ } = await fetchBookmarks();
    setSavedMovieIDS(movieIDS_);
    setBookmarkedMovies(savedMoviesData_);
  };

  const handleGoogleAuth = () => {
    signInWithPopup(firebaseAuth, googleProvider)
      .then(async (result: UserCredential) => {
        onAuthenticationSuccess(result.user);
        getBookmarks();
        setShowLoginModal(false);
      })
      .catch((error) => {
        if (error.message === "Firebase: Error (auth/internal-error).") {
          toast.error("You might be having connection issues");
        } else {
          toast.error(error.message);
        }
        console.log(error.message);
      });
  };

  React.useEffect(() => {
    getBookmarks();
  }, [router, firebaseAuth.currentUser?.uid]);

  const handleEmailAndPasswordAuth = () => {
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(firebaseAuth, email, password)
        .then(async (result: UserCredential) => {
          onAuthenticationSuccess(result.user);
          getBookmarks();
          setShowLoginModal(false);
          setLoading(false);
        })
        .catch((error) => {
          if (error.message === "Firebase: Error (auth/internal-error).") {
            toast.error("You might be having connection issues");
          } else if (
            error.message === "Firebase: Error (auth/user-not-found)."
          ) {
            toast.error("User not found");
          } else {
            toast.error(error.message);
          }
          console.log(error.message);
          setLoading(false);
        });
    } else {
      setLoading(false);
      setErrorMessage("One or more fields empty");
    }
  };
  const handleSignUpClicked = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  if (showResetModal)
    return <PasswordReset closeModal={() => setShowResetModal(false)} />;

  return (
    <>
      <ModalLayout onHideModal={() => setShowLoginModal(false)}>
        <section className=" p-2 w-full flex flex-col gap-4 justify-center items-center min-w-[350px] ">
          <BiX
            className="absolute top-6 right-10 cursor-pointer"
            onClick={() => setShowLoginModal(false)}
            size={28}
          />
          <h1 className="text-2xl uppercase">Login</h1>
          <div className="flex w-full  flex-col">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              value={email}
              className="bg-transparent border outline-none p-2 rounded-md "
              onChange={(event) => {
                setEmail(event.target.value);
                if (email !== "" || password !== "") {
                  setErrorMessage("");
                }
              }}
            />
          </div>
          <div className="flex pb-2 w-full flex-col">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              value={password}
              className="outline-none p-2 rounded-md bg-transparent border"
              onChange={(event) => {
                setPassword(event.target.value);
                if (email !== "" || password !== "") {
                  setErrorMessage("");
                }
              }}
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}

          <button
            onClick={handleEmailAndPasswordAuth}
            className="border w-full justify-center text-center rounded-md bg-[#2221] p-2 flex items-center gap-2"
          >
            {loading ? "Loading...." : "Sign in"}
          </button>
          <p
            className="cursor-pointer"
            onClick={() => {
              setShowResetModal(true);
              console.log("hello");
            }}
          >
            Forgot Password? Reset Here
          </p>
          <div className="flex items-center gap-2 ">
            <hr className="w-[100px]" />
            <p>OR</p>
            <hr className="w-[100px]" />
          </div>
          <button
            onClick={handleGoogleAuth}
            className="border w-full justify-center  rounded-md bg-[#2221] p-2 flex items-center gap-2"
          >
            <FcGoogle /> Sign in with gmail
          </button>
          <div onClick={handleSignUpClicked} className="flex gap-3">
            Don&apos;t have an account?
            <button className="">Sign up</button>
          </div>
        </section>
      </ModalLayout>
    </>
  );
};

export default LoginModal;
