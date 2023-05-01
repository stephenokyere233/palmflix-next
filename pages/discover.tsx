import { FaBars, FaFire, FaHome, FaSearch, FaTv } from "react-icons/fa"
import { BiMovie } from "react-icons/bi"
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md"
import { useEffect, useState } from "react";
import axios from "axios";
import { discover_movies } from "@/constants/endpoints";
import Loader from "@/components/loader/Loader";
import MovieCard from "@/components/Cards/MovieCard";
import { TABS } from "@/constants/TABS"
import Link from "next/link";
import MoviesLayout from "@/components/layout/MoviesLayout";

export default function Home() {
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
      console.log(response.data);
      setMoviesData(response.data)
      setTotalPages(response.data.total_pages)
      setLoading(false)
    }).catch(function (error) {
      console.error(error);
      setLoading(false)
    });
  }

  console.log("currentPage", currentPage)



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
    getMovies(discover_movies, currentPage)

  }, [currentPage])
  return (
    <MoviesLayout actionNext={goToNextPage} actionPrev={goToPrevPage} title="Discover Movies">
      {
        loading ? <Loader/> : (
          moviesData && moviesData.results.map((movie: { title: any; name: any; id: any; poster_path: any; }) => {
            const { title, name, id, poster_path } = movie
            return (
              <MovieCard key={id} title={title || name} imageURL={poster_path} movieID={id} />
            )
          })
        )

      }
    </MoviesLayout>

  );
}
