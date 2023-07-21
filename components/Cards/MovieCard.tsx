import { img_path } from "@/constants/endpoints";
import Image from "next/image";
import React, { useContext } from "react";
import { AppContext } from "@/context";
import { BiBookmark, BiBookmarkHeart } from "react-icons/bi";
import { useRouter } from "next/router";
import { firebaseAuth, firestoreDB } from "@/config/firebase.config";
import { setDoc, doc, deleteDoc } from "firebase/firestore";
import toast from "react-hot-toast";

type movieProps = {
  movieData: any;
};

const MovieCard: React.FC<movieProps> = ({ movieData }) => {
  const router = useRouter();
  const {
    setShowLoginModal,
    setSavedMovieIDS,
    savedMovieIDS,
    setBookmarkedMovies,
    bookmarkedMovies,
  } = useContext(AppContext);

  const handleClick = (id: string) => {
    let media_type = movieData.hasOwnProperty("first_air_date")
      ? "tv"
      : "movie";

    router.push(`/preview/${media_type}/${id}`);
    localStorage.setItem("selectedMovieID", id);
  };

  async function handleRemoveButtonClick(movieID: string) {
    let savedArray = [...savedMovieIDS];
    let bookmarks = [...bookmarkedMovies];
    function filterById(arr: any[], id: any) {
      return arr.filter((obj: { id: any }) => obj.id !== id);
    }
    if (!firebaseAuth.currentUser?.uid) {
      setShowLoginModal(true);
    } else {
      const docRef = `user_bookmarks/${firebaseAuth.currentUser.uid}/saved_bookmarks/${movieID}`;
      const index = savedArray.indexOf(movieID);
      if (index > -1) {
        const toastId = toast.loading("Loading...");
        await deleteDoc(doc(firestoreDB, docRef))
          .then(() => {
            toast.success("Removed from bookmarks");
            toast.dismiss(toastId);
            savedArray.splice(index, 1);
            bookmarks = filterById(bookmarks, movieID);
            setBookmarkedMovies(bookmarks);
            setSavedMovieIDS(savedArray);
          })
          .catch(() => {
            toast.error("Error occured removing bookmark");
          });
        localStorage.setItem("savedMovies", JSON.stringify(savedArray));
        localStorage.setItem("savedMoviesData", JSON.stringify(bookmarks));
      }
    }
  }

  const addToBookmark = async () => {
    let savedArray = [...savedMovieIDS];
    if (!firebaseAuth.currentUser?.uid) {
      setShowLoginModal(true);
    } else {
      let media_type = movieData.hasOwnProperty("first_air_date")
        ? "tv"
        : "movie";

      const movieToSave = {
        title: movieData.title || movieData.name,
        id: movieData.id,
        uid: firebaseAuth.currentUser.uid,
        backdrop_path: movieData.backdrop_path || movieData.poster_path,
        poster_path: movieData.poster_path || movieData.backdrop_path,
        description: movieData.overview,
        media_type: media_type,
      };
      let docRef = `user_bookmarks/${firebaseAuth.currentUser.uid}/saved_bookmarks/${movieData.id}`;

      const LSMovies = localStorage.getItem("savedMovies") || "";

      if (LSMovies.includes(movieData.id)) {
        handleRemoveButtonClick(movieData.id);
      } else {
        const toastId = toast.loading("Loading...");
        await setDoc(doc(firestoreDB, docRef), movieToSave)
          .then(() => {
            toast.success("Added to bookmarks");
            toast.dismiss(toastId);
            savedArray.push(movieData.id);
            setSavedMovieIDS(savedArray);
          })
          .catch(() => {
            toast.error("Error occured adding bookmark");
          });
        localStorage.setItem("savedMovies", JSON.stringify(savedArray));
      }
    }
  };

  const handleBookmarkClick = () => {
    addToBookmark();
  };

  const handleCardClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (!(event.target instanceof SVGElement)) {
      handleClick(movieData.id);
    } else {
      handleBookmarkClick();
    }
  };

  return (
    <div>
      <div
        style={{ background: "rgba(169, 169, 169, 0.2)" }}
        className="max-w-[350px] rounded-md w-[280px] h-[400px] p-2 cursor-pointer "
        onClick={handleCardClick}
      >
        <Image
          src={
            movieData.poster_path
              ? img_path + movieData.poster_path
              : "/no_preview.jpg"
          }
          alt={movieData.title || movieData.name}
          width={300}
          height={300}
          className="h-[85%] object-cover rounded-md  bg-gray-400"
        />
        <div className="flex justify-between p-2 items-center">
          <p className="w-[90%] max-lines-2">
            {movieData.title || movieData.name}
          </p>
          {savedMovieIDS.includes(movieData.id) ? (
            <BiBookmarkHeart size={28} className="text-green-400" />
          ) : (
            <BiBookmark size={28} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
