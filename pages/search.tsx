import MovieCard from '@/components/Cards/MovieCard';
import MoviesLayout from '@/components/layout/MoviesLayout';
import Loader from '@/components/loader/Loader';
import { trending_movies } from '@/constants/endpoints';
import { AppContext } from '@/context';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'

const SearchResults = () => {
    const { showSignupModal, setShowSignupModal, showLoginModal, setShowLoginModal, searchQuery, setSearchQuery, searchResults, setSearchResults } = useContext(AppContext)

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(100)


    const goToNextPage = () => {
        if (currentPage <= totalPages) {
            setCurrentPage(prev => prev + 1)
            console.log("met")
        }
    }
    const goToPrevPage = () => {
        if (currentPage <= 1) return
        setCurrentPage(currentPage - 1)
    }

    return (
        <MoviesLayout actionNext={goToNextPage} actionPrev={goToPrevPage} title="Trending Movies">
            {

                searchResults && searchResults.results.map((movie: { title: any; name: any; id: any; poster_path: any; }) => {
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
