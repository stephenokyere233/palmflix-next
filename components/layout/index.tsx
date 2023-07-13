/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useContext } from "react";
import Header from "../header";
import { AppContext } from "@/context";
import LoginModal from "../modal/login.auth";
import SignUpModal from "../modal/signup.auth";
import { useRouter } from "next/router";
import { firebaseAuth } from "@/config/firebase.config";
import { DocumentData } from "firebase/firestore";
import { fetchBookmarks } from "@/services/bookmarks.service";
import useLoading from "@/hooks/useLoading";
import Loader from "../loader/Loader";

const Layout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    showSignupModal,
    setShowSignupModal,
    showLoginModal,
    setShowLoginModal,
    setShowUserDropdown,
    setBookmarkedMovies,
    setSavedMovieIDS,
    showSidebar,
    setShowSidebar,
  } = useContext(AppContext);
  const router = useRouter();

  const [movieIDS, setMovieIDS] = React.useState<DocumentData[]>([]);
  const [moviesData, setMoviesData] = React.useState<DocumentData[]>([]);

  React.useEffect(() => {
    const getBookmarks = async () => {
      const { savedMoviesData_, movieIDS_ } = await fetchBookmarks();
      setSavedMovieIDS(movieIDS_);
      setBookmarkedMovies(savedMoviesData_);
      setMovieIDS(movieIDS_);
      setMoviesData(savedMoviesData_);
    };
    getBookmarks();
  }, [router, firebaseAuth.currentUser?.uid]);

  React.useEffect(() => {
    const savedMovies = localStorage.getItem("savedMovies");
    if (savedMovies) {
      try {
        const parsedData = JSON.parse(savedMovies);
        if (Array.isArray(parsedData)) {
          setSavedMovieIDS(parsedData);
        }
      } catch (error) {
        console.error("Error parsing stored data:", error);
      }
    } else {
      setSavedMovieIDS(movieIDS);
    }

    const savedMoviesData = localStorage.getItem("savedMoviesData");

    if (savedMoviesData) {
      try {
        const parsedData = JSON.parse(savedMoviesData);
        if (Array.isArray(parsedData)) {
          setBookmarkedMovies(parsedData);
        }
      } catch (error) {
        console.error("Error parsing stored data:", error);
      }
    } else {
      setBookmarkedMovies(moviesData);
    }
  }, [movieIDS, moviesData, setBookmarkedMovies, setSavedMovieIDS]);

  const { loading } = useLoading();

  React.useEffect(() => {
    const keyClose = (event: KeyboardEvent) => {
      const { key } = event;
      if (key === "Escape") {
        setShowSignupModal(false);
        setShowLoginModal(false);
        setShowUserDropdown(false);
        setShowSidebar(false);
      }
    };
    window.addEventListener("keydown", keyClose);
    return () => {
      window.removeEventListener("keydown", keyClose);
    };
  }, []);
  React.useEffect(() => {
    setShowSignupModal(false);
    setShowLoginModal(false);
    setShowUserDropdown(false);
    setShowSidebar(false);
  }, [router]);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setShowUserDropdown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (loading && router.pathname === "/") {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className=" text-white flex flex-col w-full">
      <Header />
      {showLoginModal && <LoginModal />}
      {showSignupModal && <SignUpModal />}
      <main className="flex  flex-1 h-[90vh] overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};

export default Layout;
