/* eslint-disable react-hooks/exhaustive-deps */
import CastCard from "@/components/Cards/CastCard";
import MovieCard from "@/components/Cards/MovieCard";
import ReviewCard from "@/components/Cards/ReviewCard";
import Slider from "react-slick";
import Loader from "@/components/loader/Loader";
import ReviewModal from "@/components/modal/review.modal";
import YouTubePlayer from "@/components/ytplayer";
import { firebaseAuth, firestoreDB } from "@/config/firebase.config";
import { SLIDER_CONFIG } from "@/config/slider.config";
import { img_path } from "@/constants/endpoints";
import { AppContext } from "@/context";
import { Review } from "@/interfaces";
import axios from "axios";
import { setDoc, doc, deleteDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiBookmark, BiShareAlt } from "react-icons/bi";
import ShareModal from "@/components/modal/share.modal";
import MovieMeta from "@/components/Meta/MovieMeta";
import { fetchMovieData } from "@/services/fetchMovies.service";
import { motion } from "framer-motion";
import useFetchUserReviews from "@/hooks/useUserReviews";
import { Slide } from "react-slideshow-image";

const MoviePreview: React.FC<any> = () => {
  const [movieInfo, setMovieInfo] = useState<any>(null);
  const [movieCastInfo, setMovieCastInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {
    setShowLoginModal,
    savedMovieIDS,
    setSavedMovieIDS,
    showReviewModal,
    setShowReviewModal,
    showShareModal,
    setShowShareModal,
    // reviews,
  } = useContext(AppContext);
  const [trailers, setTrailers] = useState<any>([]);
  const [showPlayer, setShowPlayer] = React.useState<boolean>(false);
  const [showAllCasts, setShowAllCasts] = useState<number>(8);
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);
  const [allReviews, setAllReviews] = useState<any[]>([]);
  const [loadingReviews, setLoadingReviews] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { movieID, mediaType } = router.query;

  const { reviews, fetchReviews } = useFetchUserReviews();

  const fetchMediaData = async (movieID: string, media_type: string) => {
    setLoading(true);
    fetchMovieData(movieID, media_type)
      .then((result) => {
        setMovieInfo(result?.movieInfo_);
        setMovieCastInfo(result?.movieCast_.cast);
        setLoading(false);
        setError(result?.error_ as boolean);
      })
      .catch((err) => {
        setError(true);
        console.log(err);
      });
  };

  const fetchSimilarMovies = (movieID: string) => {
    if (!movieID) return;
    const api_url = `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`;
    axios
      .get(api_url)
      .then((response) => {
        setSimilarMovies(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchMovieReviews = async (movieID: string) => {
    if (!movieID) return;
    setLoadingReviews(true);
    try {
      const api_url = `https://api.themoviedb.org/3/movie/${movieID}/reviews?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`;

      const api_reviews = await fetch(api_url);

      if (!api_reviews.ok) {
        throw new Error("Failed to fetch API reviews");
      }

      const api_review_data = await api_reviews.json();
      setLoadingReviews(false);
      setAllReviews(api_review_data.results);
    } catch (error) {
      console.error(error);
      setLoadingReviews(false);
      console.error("Error fetching movie reviews:", error);
    }
  };

  const deleteReview = async (docID: string) => {
    const docRef = `user_reviews/${docID}`;
    const toastId = toast.loading("Loading...");
    await deleteDoc(doc(firestoreDB, docRef))
      .then(() => {
        toast.success("Review deleted");
        fetchMovieReviews(movieID as string);
        fetchReviews();
        toast.dismiss(toastId);
      })
      .catch(() => {
        toast.error("Error occured removing bookmark");
      });
  };

  useEffect(() => {
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
    }

    if (!movieID || !mediaType) return;

    const fetchData = async () => {
      fetchSimilarMovies(movieID as string);
      fetchMediaData(movieID as string, mediaType as string);
      fetchMovieReviews(movieID as string);
      fetchReviews();
    };

    fetchData();
  }, [movieID, mediaType]);

  const fetchTrailer = async (movieID: string) => {
    const api_url = "https://api.themoviedb.org/3";
    const endpoint = `${api_url}/${mediaType}/${movieID}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`;
    try {
      const response = await axios.get(endpoint);
      const filteredTrailers = response.data.results.filter(
        (trailer: any) =>
          trailer.type === "Trailer" ||
          trailer.name.includes("Official" || "official"),
      );
      setShowPlayer(true);
      setTrailers(filteredTrailers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const savedMovies = localStorage.getItem("savedMovies");

    if (savedMovies) {
      try {
        const parsedData = JSON.parse(savedMovies);
        console.log("parsedData", parsedData);
        if (Array.isArray(parsedData)) {
          setSavedMovieIDS(parsedData);
        }
      } catch (error) {
        console.error("Error parsing stored data:", error);
      }
    }
    fetchMovieReviews(movieID as string);
    fetchReviews();
  }, []);

  async function handleRemoveButtonClick(movieID: string) {
    let savedArray = [...savedMovieIDS];
    console.log("saved", savedArray);
    if (!firebaseAuth.currentUser?.uid) {
      console.log("login to save a movie");
      setShowLoginModal(true);
    } else {
      console.log(firebaseAuth.currentUser?.uid);
      console.log(movieID);
      const docRef = `user_bookmarks/${firebaseAuth.currentUser.uid}/saved_bookmarks/${movieID}`;
      const index = savedArray.indexOf(movieID);
      console.log(index);
      if (index > -1) {
        const toastId = toast.loading("Loading...");
        await deleteDoc(doc(firestoreDB, docRef))
          .then(() => {
            toast.success("Removed from bookmarks");
            toast.dismiss(toastId);
            savedArray.splice(index, 1);
            setSavedMovieIDS(savedArray);
          })
          .catch(() => {
            toast.error("Error occured removing bookmark");
          });
        localStorage.setItem("savedMovies", JSON.stringify(savedArray));
      }
    }
  }

  const addToBookmark = async () => {
    let savedArray = [...savedMovieIDS];
    if (!firebaseAuth.currentUser?.uid) {
      toast.error("Login to save a movie");
      setShowLoginModal(true);
    } else {
      const movieToSave = {
        title: movieInfo.title || movieInfo.name,
        id: movieInfo.id,
        uid: firebaseAuth.currentUser.uid,
        backdrop_path: movieInfo.backdrop_path,
        poster_path: movieInfo.poster_path,
        description: movieInfo.overview,
      };
      let docRef = `user_bookmarks/${firebaseAuth.currentUser.uid}/saved_bookmarks/${movieInfo.id}`;
      const LSMovies = localStorage.getItem("savedMovies") || "";
      if (LSMovies.includes(movieInfo.id)) {
        handleRemoveButtonClick(movieInfo.id);
      } else {
        const toastId = toast.loading("Loading...");
        await setDoc(doc(firestoreDB, docRef), movieToSave)
          .then(() => {
            toast.success("Added to bookmarks");
            toast.dismiss(toastId);
            savedArray.push(movieInfo.id);
            setSavedMovieIDS(savedArray);
          })
          .catch(() => {
            toast.error("Error occured adding bookmark");
          });
        localStorage.setItem("savedMovies", JSON.stringify(savedArray));
      }
    }
  };

  if (loading || movieID === "" || !movieInfo) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="flex min-h-screen w-full items-center justify-center "
      >
        <Loader />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="flex  h-[90vh] w-full flex-1 flex-col items-center justify-center"
      >
        <Image src="/error.png" alt="error" width={450} height={450} />
        <p className="text-xl">Error getting movie data</p>{" "}
      </motion.div>
    );
  }

  return (
    <>
      <MovieMeta
        image={`${
          img_path + (movieInfo.backdrop_path || movieInfo.poster_path)
        }`}
        title={movieInfo.title}
        description={movieInfo.overview}
      />
      {showPlayer && (
        <YouTubePlayer
          videoId={trailers[0].key}
          onClose={() => setShowPlayer(false)}
        />
      )}
      {showReviewModal && <ReviewModal />}
      {showShareModal && <ShareModal />}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="mx-auto mb-10 w-screen bg-[#040720] p-4 md:w-[90rem] "
      >
        <header
          className="relative h-[500px]  w-full rounded-md bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${
              img_path + (movieInfo.backdrop_path || movieInfo.poster_path)
            })`,
          }}
        >
          <button
            className=" m-3 rounded-md bg-brand p-2 px-4 text-white"
            onClick={() => router.back()}
          >
            Back
          </button>
          <div className="absolute bottom-6 mx-6">
            <h2 className="text-4xl font-bold ">
              {movieInfo.title || movieInfo.name}
            </h2>
            <button
              className=" rounded-md bg-brand p-2 px-4 text-xl"
              onClick={() => fetchTrailer(movieInfo.id)}
            >
              Watch Trailer
            </button>
          </div>
        </header>
        <div className="flex flex-col items-center justify-between gap-4  py-4 md:flex-row  md:px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-[120px] w-[150px] items-center justify-center border text-3xl font-bold text-brand">
              {movieInfo.vote_average && movieInfo.vote_average.toFixed(1)}
            </div>
            <div className="text-sm md:text-lg">
              <div className="flex gap-2">
                <p className="font-bold text-brand">Status:</p>
                <p>{movieInfo.status}</p>
              </div>
              <div className="flex gap-2">
                <p className="font-bold text-brand">Duration:</p>
                <p>{movieInfo.runtime || movieInfo.episode_run_time} mins</p>
              </div>
              <div className="flex gap-2">
                <p className="font-bold text-brand">Release Date:</p>
                <p>{movieInfo.release_date || movieInfo.first_air_date}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="p-2 md:px-4 rounded-md bg-brand text-white text-sm md:text-lg"
              onClick={() => {
                !firebaseAuth.currentUser?.uid
                  ? setShowLoginModal(true)
                  : setShowReviewModal(true);
              }}
            >
              Leave a review
            </button>

            {savedMovieIDS?.includes(movieInfo.id) ? (
              <div
                className="flex cursor-pointer gap-3 text-green-400  text-sm md:text-lg "
                onClick={addToBookmark}
              >
                <p>Saved</p>
                <BiBookmark size={24} />
              </div>
            ) : (
              <div
                className="flex cursor-pointer gap-3 text-sm md:text-lg "
                onClick={addToBookmark}
              >
                <p className="">Add to saved Trailers</p>
                <BiBookmark size={24} />
              </div>
            )}
            <BiShareAlt
              size={28}
              className="cursor-pointer"
              onClick={() => setShowShareModal(true)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 py-6 md:flex-row md:px-10">
          <h2 className="text-xl font-bold text-brand ">Description</h2>
          <p className="max-w-[1000px]">{movieInfo.overview}</p>
        </div>

        <div id="reviews">
          <h2 className="mt-6 mb-2 text-center text-2xl font-semibold text-brand">
            Movie Reviews
          </h2>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="mb-10"
          >
            {loadingReviews ? (
              <div
                style={{ background: "rgba(169, 169, 169, 0.2)" }}
                className="flex items-center p-10 rounded-md h-[300px] gap-4 flex-col justify-center text-2xl relative"
              >
                <p className="text-3xl capitalize">loading reviews...</p>
              </div>
            ) : [
                ...reviews.filter((review: any) => review.movieID === movieID),
                ...allReviews,
              ].length > 0 ? (
              <Slide slidesToShow={2} autoplay>
                {[
                  ...reviews.filter(
                    (review: any) => review.movieID === movieID,
                  ),
                  ...allReviews,
                ].map((review) => {
                  const { author_details, content, created_at, id, type } =
                    review;
                  return type === "user" ? (
                    <ReviewCard
                      key={id}
                      username={review.username}
                      content={content}
                      created_at={created_at}
                      uid={review.uid}
                      type={review.type}
                      rating={review.rating}
                      removeReview={() => deleteReview(review.id)}
                      id={review.id}
                    />
                  ) : (
                    <ReviewCard
                      key={id}
                      username={author_details.username}
                      content={content}
                      created_at={created_at}
                      rating={author_details.rating}
                      id={id}
                    />
                  );
                })}
              </Slide>
            ) : (
              <div
                style={{ background: "rgba(169, 169, 169, 0.2)" }}
                className="flex items-center p-10 rounded-md h-[300px] gap-4 flex-col justify-center text-2xl"
              >
                <p className="text-3xl capitalize">No reviews yet</p>
                <button
                  className="p-2 md:px-4 rounded-md bg-brand text-white text-sm md:text-lg"
                  onClick={() => {
                    !firebaseAuth.currentUser?.uid
                      ? setShowLoginModal(true)
                      : setShowReviewModal(true);
                  }}
                >
                  Leave a review
                </button>
              </div>
            )}
          </motion.div>
        </div>

        <section className="">
          <h2 className="text-center text-2xl font-semibold text-brand">
            Movie Casts
          </h2>
          <div className="">
            <div className="grid grid-cols-2 place-items-center gap-4  py-6 lg:grid-cols-4">
              {movieCastInfo &&
                movieCastInfo.cast?.slice(0, showAllCasts).map((cast: any) => {
                  return <CastCard key={cast.id} castInfo={cast} />;
                })}
            </div>
            <button
              className=" w-full  rounded-md bg-[#ffffff12] p-3 text-xl"
              onClick={() => {
                if (showAllCasts === 8) {
                  setShowAllCasts(-1);
                } else {
                  setShowAllCasts(8);
                }
              }}
            >
              {showAllCasts === 8 ? " See All Casts" : " See less Casts"}
            </button>
          </div>
          <div className=" mt-4">
            <h2 className="text-center text-2xl font-semibold text-brand">
              {" "}
              Recommended Movies For You
            </h2>
            <div className="flex flex-wrap  justify-center gap-4 py-6">
              {similarMovies?.length < 1 ? (
                <>
                  <h2 className="text-xl">No related movies</h2>
                </>
              ) : (
                similarMovies.map((movie) => {
                  return <MovieCard movieData={movie} key={movie.id} />;
                })
              )}
            </div>
          </div>
        </section>
      </motion.div>
    </>
  );

  // )
};

export default MoviePreview;
