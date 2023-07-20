import MovieCard from '@/components/Cards/MovieCard'
import MoviesLayout from '@/components/layout/MoviesLayout'
import Loader from '@/components/loader/Loader'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { now_showing } from '@/constants/endpoints'

const NowShowing = () => {

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
        }
    }
    const goToPrevPage = () => {
        if (currentPage <= 1) return
        setCurrentPage(currentPage - 1)
    }

    useEffect(() => {
        getMovies(now_showing, currentPage)
    }, [currentPage])
    return (
      <MoviesLayout
        actionNext={goToNextPage}
        actionPrev={goToPrevPage}
        title="Top Rated Movies"
      >
        {loading ? (
          <Loader />
        ) : !moviesData ? (
          <div className="flex items-center justify-center flex-col">
            <Image src="/error.png" alt="error" width={450} height={450} />
            <p className="text-xl">Error getting movies</p>{" "}
          </div>
        ) : (
          moviesData.results.map((movie: any) => {
            return <MovieCard movieData={movie} key={movie.id} />;
          })
        )}
      </MoviesLayout>
    );
}

export default NowShowing
