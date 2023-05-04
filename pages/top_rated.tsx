import MovieCard from '@/components/Cards/MovieCard';
import MoviesLayout from '@/components/layout/MoviesLayout';
import Loader from '@/components/loader/Loader';
import { top_rated } from '@/constants/endpoints';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';

const TopRatedMovies = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const [moviesData, setMoviesData] = useState<any>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(100)


    const getMovies = (url: string, page: number) => {
        const options = {
            method: 'GET',
            url: url,
            params: { api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY, language: 'en-US', page: page }
        };
        setLoading(true)

        axios.request(options).then(function (response) {
            setMoviesData(response.data)
            setTotalPages(response.data.total_pages)
            setLoading(false)
        }).catch(function (error) {
            console.error(error);
            setLoading(false)
        });
    }

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

    useEffect(() => {
        getMovies(top_rated, currentPage)
    }, [currentPage])
    return (
        <MoviesLayout actionNext={goToNextPage} actionPrev={goToPrevPage} title="Top Rated Movies">
            {
                loading ? <Loader /> : (
                    !moviesData ? <div className='flex items-center justify-center flex-col'><Image src="/error.png" alt="error" width={450} height={450} /><p className='text-xl'>Error getting movies</p> </div> : moviesData.results.map((movie: { title: any; name: any; id: any; poster_path: any; }) => {
                        const { title, name, id, poster_path } = movie
                        return (
                            <MovieCard key={id} title={title || name} imageURL={poster_path} movieID={id} />
                        )
                    })
                )

            }
        </MoviesLayout>
    )
}

export default TopRatedMovies
