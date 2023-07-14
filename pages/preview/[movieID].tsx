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
import {
  setDoc,
  doc,
  deleteDoc,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiBookmark, BiShareAlt } from "react-icons/bi";
import ShareModal from "@/components/modal/share.modal";
import MovieMeta from "@/components/Meta/MovieMeta";
import { mergeObjects } from "@/utils/mergeObj.util";

const MoviePreview: React.FC<any> = () => {
  const [movieInfo, setMovieInfo] = useState<any>(null);
  const [movieCastInfo, setMovieCastInfo] = useState<any>(null);
  const [dataType, setDataType] = useState<string>("movie");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();
  const {
    setSelectedMovieID,
    selectedMovieID,
    setShowLoginModal,
    savedMovieIDS,
    setSavedMovieIDS,
    showReviewModal,
    setShowReviewModal,
    showShareModal,
    setShowShareModal,
  } = useContext(AppContext);
  const [trailers, setTrailers] = useState<any>([]);
  const [showPlayer, setShowPlayer] = React.useState<boolean>(false);
  const [showAllCasts, setShowAllCasts] = useState<number>(8);
  const [similarMovies, setSimilarMovies] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [userReviews, setUserReviews] = useState<Review[]>([]);

  const getUserReviews = async (movieID: string) => {
    const reviews_: Review[] = [];
    let collectionRef = collection(firestoreDB, "user_reviews");
    let q = query(collectionRef, where("movieID", ">=", movieID));

    onSnapshot(q, (docsSnap) => {
      docsSnap.forEach((doc) => {
        reviews_.push(doc.data() as Review);
      });
      setUserReviews(reviews_);
      setLoading(false);
    });
  };

  const deleteReview = async (docID: string, movieID: string) => {
    const docRef = `user_reviews/${docID}`;
    const toastId = toast.loading("Loading...");
    await deleteDoc(doc(firestoreDB, docRef))
      .then(() => {
        toast.success("Review deleted");
        getUserReviews(movieID);
        toast.dismiss(toastId);
      })
      .catch(() => {
        toast.error("Error occured removing bookmark");
      });
  };

  // function mergeObjects(obj1: any, obj2: any) {
  //   const merged = { ...obj1, ...obj2 };
  //   Object.keys(merged).forEach((key) => {
  //     if (
  //       merged[key] === null ||
  //       merged[key] === undefined ||
  //       merged[key] === ""
  //     ) {
  //       delete merged[key];
  //     }
  //   });
  //   setMovieInfo(merged);
  // }

  const fetchMovieData = async (movieID: string) => {
    try {
      const [movieDataRes, tvDataRes, movieCastRes, tvCastRes] =
        await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
          ),
          fetch(
            `https://api.themoviedb.org/3/tv/${movieID}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
          ),
          fetch(
            `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
          ),
          fetch(
            `https://api.themoviedb.org/3/tv/${movieID}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
          ),
        ]);

      if (!movieDataRes.ok && !tvDataRes.ok) {
        throw new Error("Failed to fetch movie and TV data");
      }
      if (!movieCastRes.ok && !tvCastRes.ok) {
        throw new Error("Failed to fetch movie Cast and TV Cast");
      }

      const [movieData, tvData, movieCast, tvCast] = await Promise.all([
        movieDataRes.json(),
        tvDataRes.json(),
        movieCastRes.json(),
        tvCastRes.json(),
      ]);
      setMovieInfo(mergeObjects(movieData, tvData));
      console.log("movieCast", movieCast);
      console.log("tvCast", tvCast);
      if (movieCast.cast && movieCast.cast.length > 1) {
        setMovieCastInfo(movieCast);
        setDataType("movie");
      } else if (tvCast.cast && tvCast.cast.length > 1) {
        console.log("tvCast found");
        setMovieCastInfo(tvCast);
        setDataType("tv");
      } else if (
        movieCast.cast &&
        movieCast.cast.length > 1 &&
        tvCast.cast &&
        tvCast.cast.length > 1
      ) {
        console.log("both defined");
        setMovieCastInfo(movieCast);
        setDataType("movie");
      }

      setLoading(false);
      setError(false);
    } catch (error) {
      console.error(error);
      setError(true);
      setLoading(false);
    }
  };

  const fetchSimilarMovies = (movieID: string) => {
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
    const api_url = `https://api.themoviedb.org/3/movie/${movieID}/reviews?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`;

    const options = {
      method: "GET",
      url: api_url,
      headers: {
        accept: "application/json",
      },
    };
    axios
      .request(options)
      .then(function (response) {
        setReviews(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchMovieReviews(selectedMovieID);
    fetchSimilarMovies(selectedMovieID);
    getUserReviews(selectedMovieID);
  }, [selectedMovieID]);

  useEffect(() => {
    const selectedID = localStorage.getItem("selectedMovieID");
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
    if (!selectedMovieID) {
      setSelectedMovieID(selectedID);
      fetchMovieData(selectedID as string);
    } else {
      fetchMovieData(selectedMovieID);
    }
  }, [selectedMovieID]);

  useEffect(() => {
    const { movieID } = router.query;
    setSelectedMovieID(movieID);
    localStorage.setItem("selectedMovieID", movieID?.toString() as string);
  }, [router]);

  useEffect(() => {
    if (!selectedMovieID) {
      const id = localStorage.getItem("selectedMovieID");
      setSelectedMovieID(id);
    }
  }, []);
  console.log("movieINfo", movieInfo);

  const fetchTrailer = async (movieID: string) => {
    const api_url = "https://api.themoviedb.org/3";
    const endpoint = `${api_url}/${dataType}/${movieID}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`;
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

  if (loading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center ">
        <Loader />
      </div>
    );
  }
  if (error || !movieInfo) {
    return (
      <div className="flex  h-[90vh] w-full flex-1 flex-col items-center justify-center">
        <Image src="/error.png" alt="error" width={450} height={450} />
        <p className="text-xl">Error getting movie data</p>{" "}
      </div>
    );
  }

  return (
    <>
      <MovieMeta id={selectedMovieID} />
      {showPlayer && (
        <YouTubePlayer
          videoId={trailers[0].key}
          onClose={() => setShowPlayer(false)}
        />
      )}
      {showReviewModal && <ReviewModal />}
      {showShareModal && <ShareModal />}
      <div className="mx-auto mb-10 w-screen bg-[#040720] p-4 md:w-[90rem] ">
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
              {movieInfo.vote_average.toFixed(1)}
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
          <h2 className="my-10 text-center text-2xl font-semibold text-brand">
            Movie Reviews
          </h2>
          <div className="mb-10">
            <Slider {...SLIDER_CONFIG} className="gap-20">
              {[
                ...reviews,
                ...userReviews.filter(
                  (review) => review.movieID === selectedMovieID,
                ),
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
                    removeReview={() =>
                      deleteReview(review.id, selectedMovieID)
                    }
                    id={review.id}
                  />
                ) : (
                  <ReviewCard
                    key={id}
                    username={author_details.username}
                    content={content}
                    created_at={created_at}
                    id={id}
                  />
                );
              })}
            </Slider>
          </div>
        </div>

        <section className="">
          <h2 className="text-center text-2xl font-semibold text-brand">
            Movie Casts
          </h2>
          <div className="">
            <div className="grid grid-cols-2 place-items-center gap-4  py-6 lg:grid-cols-4">
              {movieCastInfo &&
                movieCastInfo.cast
                  ?.slice(0, showAllCasts)
                  .map(
                    (cast: {
                      name: any;
                      profile_path: any;
                      id: any;
                      character: any;
                    }) => {
                      const { name, profile_path, id, character } = cast;

                      return (
                        <CastCard
                          key={id}
                          name={name}
                          profile={profile_path}
                          character={character}
                          id={id}
                        />
                      );
                    },
                  )}
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
                  const { title, name, id, poster_path } = movie;
                  return (
                    <MovieCard
                      key={id}
                      title={title || name}
                      imageURL={poster_path}
                      movieID={id}
                    />
                  );
                })
              )}
            </div>
          </div>
        </section>
      </div>
    </>
    // )
  );
};

export default MoviePreview;
