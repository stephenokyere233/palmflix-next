import MovieCard from '@/components/Cards/MovieCard'
import { firebaseAuth, firestoreDB } from '@/config/firebase.config'
import { AppContext } from '@/context'
import { query, collection, where, onSnapshot, doc, DocumentData } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'


const Bookmarks = () => {
    const router = useRouter()
    const { setSelectedMovieID, selectedMovieID, setShowLoginModal, savedMovieIDS, setSavedMovieIDS, bookmarkedMovies, setBookmarkedMovies } = useContext(AppContext)


    React.useEffect(() => {
        async function fetchBookmarks() {
            const docRef = doc(firestoreDB, `user_bookmarks/${firebaseAuth.currentUser?.uid}`)
            const subCollectionRef = collection(docRef, `saved_bookmarks`)

            onSnapshot(subCollectionRef, (querySnapshot) => {
                const movieIDS_: DocumentData[] = []
                const savedMoviesData_: DocumentData[] = []

                querySnapshot.forEach((doc) => {
                    savedMoviesData_.push(doc.data())
                    movieIDS_.push(doc.data().id)
                })
                console.log(movieIDS_)
                console.log(savedMoviesData_)
                setSavedMovieIDS(movieIDS_)
                setBookmarkedMovies(savedMoviesData_)
            })
        }

        fetchBookmarks()
    }, [])

    return (
        <div className='w-full'>
            {
                bookmarkedMovies.length < 1 ? <>
                    <p>No bookmarks here</p></> : (
                    <div className='max-w-[100rem] mx-auto grid grid-cols-5 gap-10 lg:px-10'>
                        {bookmarkedMovies.map((movie: { title: any; id: any; description: any; poster_path: any }) => {
                            const { title, id, description, poster_path } = movie
                            return (
                                <MovieCard key={id} title={title} imageURL={poster_path} movieID={id} />
                            )
                        })}
                    </div>
                )
            }


        </div>
    )
}

export default Bookmarks
