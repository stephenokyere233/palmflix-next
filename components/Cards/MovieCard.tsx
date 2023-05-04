import { img_path } from '@/constants/endpoints'
import Image from 'next/image'
import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import { AppContext } from '@/context'
import { BiBookmark, BiBookmarkHeart } from 'react-icons/bi'
import { useRouter } from 'next/router'
import { firebaseAuth, firestoreDB } from '@/config/firebase.config'
import { setDoc, doc, CollectionReference, DocumentData, collection, deleteDoc } from 'firebase/firestore'
import toast from 'react-hot-toast'
import { fetchBookmarks, removeBookmark } from '@/services/bookmarks.service'

type movieProps = {
    title: string,
    imageURL: string
    movieID: string
}


const MovieCard: React.FC<movieProps> = ({ title, imageURL, movieID }) => {
    const { setShowLoginModal, setSelectedMovieID, setSavedMovieIDS, savedMovieIDS, setBookmarkedMovies } = useContext(AppContext)


    const router = useRouter()
    const handleClick = (id: string) => {
        router.push(`/preview/${id}`);
        setSelectedMovieID(id);
        localStorage.setItem("selectedMovieID", id);
    };
    const getBookmarks = async () => {
        const { movieIDS_, savedMoviesData_ } = await fetchBookmarks();
        setSavedMovieIDS(movieIDS_);
        // setBookmarkedMovies(savedMoviesData_);
    };

    async function handleRemoveButtonClick(movieID: string) {
        let savedArray = [...savedMovieIDS]
        console.log("saved",savedArray)
        if (!firebaseAuth.currentUser?.uid) {
            console.log("login to save a movie")
            setShowLoginModal(true)
        }
        else {
            console.log(firebaseAuth.currentUser?.uid)
            console.log(movieID)

            const docRef = `user_bookmarks/${firebaseAuth.currentUser.uid}/saved_bookmarks/${movieID}`
            const index = savedArray.indexOf(movieID);
            console.log(index)
            if (index > -1) {
                const toastId = toast.loading('Loading...');
                await deleteDoc(doc(firestoreDB, docRef)).then(() => {
                    toast.success("Removed from bookmarks")
                    toast.dismiss(toastId);
                    savedArray.splice(index, 1);
                    setSavedMovieIDS(savedArray)
                }).catch(() => {
                    toast.error('Error occured removing bookmark')
                });
                localStorage.setItem("savedMovies", JSON.stringify(savedArray))
            }
        }

    }

    const addToBookmark = async () => {
        let savedArray = [...savedMovieIDS]
        if (!firebaseAuth.currentUser?.uid) {
            console.log("login to save a movie")
            setShowLoginModal(true)
        }
        else {
            console.log(firebaseAuth.currentUser?.uid)
            console.log(movieID)

            const movieToSave = {
                title: title,
                id: movieID,
                uid: firebaseAuth.currentUser.uid,
                backdrop_path: imageURL,
                poster_path: imageURL,
                description: "",
            }
            let docRef = `user_bookmarks/${firebaseAuth.currentUser.uid}/saved_bookmarks/${movieID}`

            const LSMovies = localStorage.getItem("savedMovies") || ""
            let collectionRef = collection(firestoreDB, `user_bookmarks/${firebaseAuth.currentUser.uid}/saved_bookmarks`);

            if (LSMovies.includes(movieID)) {
                handleRemoveButtonClick(movieID)
            }
            else {
                const toastId = toast.loading('Loading...');
                await setDoc(doc(firestoreDB, docRef), movieToSave).then(() => {
                    toast.success("Added to bookmarks")
                    toast.dismiss(toastId);
                    savedArray.push(movieID)
                    setSavedMovieIDS(savedArray)
                }).catch(() => {
                    toast.error('Error occured adding bookmark')

                })
                localStorage.setItem("savedMovies", JSON.stringify(savedArray))
            }
        }

    }


    const handleBookmarkClick = () => {
        console.log("Bookmark clicked");
        addToBookmark()
    };

    const handleCardClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!(event.target instanceof SVGElement)) {
            handleClick(movieID);
        } else {
            handleBookmarkClick();
        }
    };


    return (
        <div>
            <div style={{ background: "rgba(169, 169, 169, 0.2)" }} className='max-w-[350px] rounded-md w-[280px] h-[400px] p-2 cursor-pointer ' onClick={handleCardClick}>
                <Image src={imageURL ? (img_path + imageURL) : "/no_preview.jpg"} alt={title} width={300} height={300} className='h-[85%] object-cover rounded-md  bg-gray-400' />
                <div className='flex justify-between p-2 items-center'>
                    <p className='w-[90%] max-lines-2'>
                        {title}
                    </p>
                    {
                        savedMovieIDS.includes(movieID) ? <BiBookmarkHeart size={28} className='text-green-400' /> : <BiBookmark size={28} />
                    }
                </div>
            </div>
        </div>
    )
}

export default MovieCard
