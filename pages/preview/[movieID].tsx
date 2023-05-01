/* eslint-disable react-hooks/exhaustive-deps */
import CastCard from '@/components/Cards/CastCard';
import MovieCard from '@/components/Cards/MovieCard';
import Loader from '@/components/loader/Loader';
import YouTubePlayer from '@/components/ytplayer';
import { firebaseAuth, firestoreDB } from '@/config/firebase.config';
import { img_path } from '@/constants/endpoints';
import { AppContext } from '@/context';
import { removeWishListItem } from '@/services/bookmarks.service';
import { CollectionReference, DocumentData, collection } from '@firebase/firestore';
import axios from 'axios';
import { setDoc, doc } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { BiBookmark } from 'react-icons/bi';

const MoviePreview: React.FC<any> = () => {
    const [movieInfo, setMovieInfo] = useState<any>(null);
    const [movieCastInfo, setMovieCastInfo] = useState<any>(null)
    const [dataType, setDataType] = useState<string>("movie")
    const [loading, setLoading] = useState(true);
    const [isSavingBookmark, setIsSavingBookmark] = useState<boolean>(false)
    const router = useRouter()
    const { setSelectedMovieID, selectedMovieID, setShowLoginModal, savedMovieIDS, setSavedMovieIDS } = useContext(AppContext)
    const [trailers, setTrailers] = useState<any>([])
    const [showPlayer, setShowPlayer] = React.useState<boolean>(false);
    const [showAllCasts, setShowAllCasts] = useState<number>(8)

    function mergeObjects(obj1: any, obj2: any) {
        const merged = { ...obj1, ...obj2 };
        Object.keys(merged).forEach(key => {
            if (merged[key] === null || merged[key] === undefined || merged[key] === "") {
                delete merged[key];
            }
        });

        console.log("merged", merged)
        setMovieInfo(merged)
        return merged;
    }

    const fetchMovieData = async (movieID: string) => {
        try {
            const [movieDataRes, tvDataRes, movieCastRes, tvCastRes] = await Promise.all([
                fetch(
                    `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
                ),
                fetch(
                    `https://api.themoviedb.org/3/tv/${movieID}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
                ),
                fetch(
                    `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
                ),
                fetch(
                    `https://api.themoviedb.org/3/tv/${movieID}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
                )
            ]);

            if (!movieDataRes.ok && !tvDataRes.ok) {
                throw new Error('Failed to fetch movie and TV data');
            }
            if (!movieCastRes.ok && !tvCastRes.ok) {
                throw new Error('Failed to fetch movie Cast and TV Cast');
            }




            const [movieData, tvData, movieCast, tvCast] = await Promise.all([
                movieDataRes.json(),
                tvDataRes.json(),
                movieCastRes.json(),
                tvCastRes.json()
            ]);
            mergeObjects(movieData, tvData)
            console.log("movieCast", movieCast)
            console.log("tvCast", tvCast)
            if (movieCast.cast && movieCast.cast.length > 1) {
                setMovieCastInfo(movieCast)
                setDataType("movie")
            }
            else if (tvCast.cast && tvCast.cast.length > 1) {
                console.log("tvCast found")
                setMovieCastInfo(tvCast)
                setDataType("tv")

            }
            else if ((movieCast.cast && movieCast.cast.length > 1) && (tvCast.cast && tvCast.cast.length > 1)) {
                console.log("both defined")
                setMovieCastInfo(movieCast)
                setDataType("movie")
            }

            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const [similarMovies, setSimilarMovies] = useState<any[]>([]);

    const fetchSimilarMovies = (movieID: string) => {
        const api_url = `https://api.themoviedb.org/3/movie/${movieID}/similar?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`;
        axios.get(api_url)
            .then((response) => {
                setSimilarMovies(response.data.results);
                console.log("similar", response.data.results)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    useEffect(() => {
        fetchSimilarMovies(selectedMovieID)
    }, [selectedMovieID]);

    useEffect(() => {
        const selectedID = localStorage.getItem("selectedMovieID")
        const savedMovies = localStorage.getItem("savedMovies")

        if (savedMovies) {
            try {
                const parsedData = JSON.parse(savedMovies);
                if (Array.isArray(parsedData)) {
                    setSavedMovieIDS(parsedData);
                }
            } catch (error) {
                console.error('Error parsing stored data:', error);
            }
        }
        console.log(selectedID)
        if (!selectedMovieID) {
            setSelectedMovieID(selectedID)
            fetchMovieData(selectedID as string)
            console.log("no movie selected")
        }
        else {
            fetchMovieData(selectedMovieID);
        }
    }, [])


    const fetchTrailer = async (movieID: string) => {
        // setLoading(true)
        const api_url = 'https://api.themoviedb.org/3';
        const endpoint = `${api_url}/${dataType}/${movieID}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`;
        try {
            const response = await axios.get(endpoint);
            const filteredTrailers = response.data.results.filter(
                (trailer: any) =>
                    trailer.type === 'Trailer' || trailer.name.includes('Official' || "official")
            );
            setShowPlayer(true)
            console.log(filteredTrailers)
            setTrailers(filteredTrailers);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    }

    React.useEffect(() => {
        const savedMovies = localStorage.getItem("savedMovies")

        if (savedMovies) {
            try {
                const parsedData = JSON.parse(savedMovies);
                console.log("parsedData", parsedData)
                if (Array.isArray(parsedData)) {
                    setSavedMovieIDS(parsedData);
                }
            } catch (error) {
                console.error('Error parsing stored data:', error);
            }
        }
    }, [])


    function handleRemoveButtonClick(movieID: string, collectionRef: CollectionReference<DocumentData>) {
        const toastId = toast.loading("removing item...")
        removeWishListItem(movieID, collectionRef)
            .then((result) => {
                console.log("result", result)
                toast.dismiss(toastId)
                console.log('Item removed successfully');
                toast.success("Item removed successfully")

            })
            .catch((error) => {
                console.error('Error removing item:', error);
                toast.dismiss(toastId)
                toast.error('Error removing item:', error)
            });
    }

    const addToBookmark = async () => {
        let savedArray = [...savedMovieIDS]
        if (!firebaseAuth.currentUser?.uid) {
            toast.error("Login to save a movie")
            setShowLoginModal(true)
        }
        else {
            console.log(firebaseAuth.currentUser?.uid)
            console.log(movieInfo)

            const movieToSave = {
                title: movieInfo.title || movieInfo.name,
                id: movieInfo.id,
                uid: firebaseAuth.currentUser.uid,
                backdrop_path: movieInfo.backdrop_path,
                poster_path: movieInfo.poster_path,
                description: movieInfo.overview,
            }
            let docRef = `user_bookmarks/${firebaseAuth.currentUser.uid}/saved_bookmarks/${movieInfo.id}`
            let collectionRef = collection(firestoreDB, `user_bookmarks/${firebaseAuth.currentUser.uid}/saved_bookmarks`);


            const LSMovies = localStorage.getItem("savedMovies") || ""



            if (LSMovies.includes(movieInfo.id)) {
                handleRemoveButtonClick(movieInfo.id.toString(), collectionRef)
            }
            else {
                setIsSavingBookmark(true)
                const toastId = toast.loading('Loading...');
                await setDoc(doc(firestoreDB, docRef), movieToSave).then(() => {
                    toast.success("Added to bookmarks")
                    toast.dismiss(toastId);
                    savedArray.push(movieInfo.id)
                    setSavedMovieIDS(savedArray)
                }).catch(() => {
                    toast.error('Error occured adding bookmark')

                })
                localStorage.setItem("savedMovies", JSON.stringify(savedArray))
            }
        }

    }


    if (loading) {
        return (
            <div className='min-h-screen w-full flex justify-center items-center '>
                <Loader />
            </div>
        )
    }
    if (!movieInfo) {
        return (
            <div className='flex  h-[90vh] w-full flex-1 items-center justify-center flex-col'><Image src="/error.png" alt="error" width={450} height={450} /><p className='text-xl'>Error getting movie data</p> </div>
        )
    }


    return (

        movieInfo && <>
            {showPlayer && <YouTubePlayer videoId={trailers[0].key} onClose={() => setShowPlayer(false)} />}
            <div className='w-[90rem] bg-[#040720] mb-10 p-4 mx-auto '>

                <header className="h-[500px] rounded-md  w-full bg-cover bg-no-repeat relative" style={{
                    backgroundImage: `url(${img_path + (movieInfo.backdrop_path || movieInfo.poster_path)
                        })`
                }}>
                    <button className=' bg-brand text-white m-3 p-2 px-4 rounded-md' onClick={() => router.back()}>
                        Back
                    </button>
                    <div className='absolute bottom-6 mx-6'>
                        <h2 className='text-4xl font-bold '>{movieInfo.title || movieInfo.name}</h2>
                        <button className=' bg-brand p-2 px-4 rounded-md text-xl' onClick={() => fetchTrailer(movieInfo.id)}>Watch Trailer</button>
                    </div>
                </header>
                <div className='flex items-center gap-4  px-6 py-4  justify-between'>
                    <div className='flex items-center gap-4'>
                        <div className='border w-[150px] h-[120px] flex justify-center items-center text-3xl text-brand font-bold'>
                            {movieInfo.vote_average.toFixed(1)}
                        </div>
                        <div>
                            <div className='flex gap-2'><p className='text-brand font-bold'>Status:</p><p>{movieInfo.status}</p></div>
                            <div className='flex gap-2'><p className='text-brand font-bold'>Duration:</p><p>{movieInfo.runtime || movieInfo.episode_run_time} mins</p></div>
                            <div className='flex gap-2'><p className='text-brand font-bold'>Release Date:</p><p>{movieInfo.release_date || movieInfo.first_air_date}</p></div>
                        </div>
                    </div>

                    {
                        savedMovieIDS?.includes(movieInfo.id) ?
                            <div className='flex gap-3 cursor-pointer text-green-400 ' onClick={addToBookmark}>
                                <p>Saved</p><BiBookmark size={24} />
                            </div> : <div className='flex gap-3 cursor-pointer' onClick={addToBookmark}>
                                <p className='text-lg'>Add to saved Trailers</p>
                                <BiBookmark size={24} />
                            </div>
                    }


                </div>
                <div className='px-10 py-6 flex gap-4'>
                    <h2 className='text-xl font-bold text-brand '>Description</h2>
                    <p className='max-w-[1000px]'>{movieInfo.overview}</p>
                </div>

                <section className=''>
                    <h2 className='text-center text-brand text-2xl font-semibold'>Movie Casts</h2>
                    <div className=''>
                        <div className='grid grid-cols-4 place-items-center  py-6 gap-4'>
                            {
                                movieCastInfo && movieCastInfo.cast?.slice(0, showAllCasts).map((cast: { name: any; profile_path: any; id: any; character: any; }) => {
                                    const { name, profile_path, id, character } = cast

                                    return (
                                        <CastCard key={id} name={name} profile={profile_path} character={character} id={id} />
                                    )

                                })
                            }
                        </div>
                        <button className=' rounded-md  text-xl p-3 bg-[#ffffff12] w-full' onClick={() => {
                            if (showAllCasts === 8) {
                                setShowAllCasts(-1)
                            }
                            else {
                                setShowAllCasts(8)

                            }
                        }}>
                            {
                                showAllCasts === 8 ? " See All Casts" : " See less Casts"
                            }

                        </button>
                    </div>
                    <div className=' mt-4'>
                        <h2 className='text-center text-brand text-2xl font-semibold'> Recommended Movies For You</h2>
                        <div className='grid grid-cols-4 place-items-center  py-6 gap-4'>
                            {
                                similarMovies.map((movie) => {
                                    const { title, name, id, poster_path } = movie
                                    return (
                                        <MovieCard key={id} title={title || name} imageURL={poster_path} movieID={id} />
                                    )
                                })
                            }

                        </div>


                    </div>
                </section>
            </div>
        </>

    )
}

export default MoviePreview