/* eslint-disable react-hooks/exhaustive-deps */
import MovieCard from '@/components/Cards/MovieCard';
import MoviesLayout from '@/components/layout/MoviesLayout';
import { AppContext } from '@/context';
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/router';

const SearchResults = () => {
    const { searchResults, searchQuery, setSearchResults, discoverMovies } = useContext(AppContext)
    const router = useRouter()
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages] = useState<number>(100)


    const goToNextPage = () => {
        if (currentPage <= totalPages) {
            setCurrentPage(prev => prev + 1)
        }
    }
    const goToPrevPage = () => {
        if (currentPage <= 1) return
        setCurrentPage(currentPage - 1)
    }

    useEffect(()=>{
        if (searchQuery === ""){
            router.replace("/search?query=")
        }
        

    },[])

    if (searchQuery === "") {

        return (
            <div className='flex w-full h-[90vh] items-center justify-center flex-col'><Image src="/error.png" alt="error" width={450} height={450} /><p className='text-xl'>No input</p> </div>
        )
    }

    return (
        <MoviesLayout actionNext={goToNextPage} actionPrev={goToPrevPage} title="Trending Movies">
            {

                searchResults && searchResults?.results.map((movie: { title: any; name: any; id: any; poster_path: any; }) => {
                    const { title, name, id, poster_path } = movie
                    return (
                        <MovieCard key={id} title={title || name} imageURL={poster_path} movieID={id} />
                    )
                })


            }
        </MoviesLayout>
    )
}

export default SearchResults
