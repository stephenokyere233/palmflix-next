import MovieCard from '@/components/Cards/MovieCard'
import { AppContext } from '@/context'
import React, { useContext, useState } from 'react'
import Image from 'next/image'
import Sidebar from '@/components/Nav'

const Bookmarks = () => {
    const { bookmarkedMovies } = useContext(AppContext)

    const Null = () => {
        return (
            <div className="flex flex-1 border h-[90vh] flex-col items-center justify-center text-xl opacity-50">
                <Image
                    src="/null.png"
                    alt=""
                    className="object-cover"
                    width={300}
                    height={300}
                />
                <p className="capitalize opacity-50">No Saved Trailers</p>
            </div>
        );
    };

    return (
        <div className='w-full h-[90vh] flex'>
            <Sidebar />
            {
                bookmarkedMovies.length < 1 ? <>
                    <Null /></> : (
                    <div className='max-w-[100rem] mx-auto lg:px-10 flex-1 overflow-y-scroll flex-col flex'>
                        <h2 className='text-3xl p-2 text-center py-4'>My Bookmarks</h2>
                        <div className='flex flex-wrap gap-10 justify-center '>
                            {bookmarkedMovies && bookmarkedMovies.map((movie: { title: any; id: any; description: any; poster_path: any }) => {
                                const { title, id, description, poster_path } = movie
                                return (
                                    <MovieCard key={id} title={title} imageURL={poster_path} movieID={id} />
                                )
                            })}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Bookmarks
