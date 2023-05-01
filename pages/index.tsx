/* eslint-disable react-hooks/exhaustive-deps */
import MovieCard from '@/components/Cards/MovieCard';
import ImageSlider from '@/components/Slider/ImageSlider'
import TrailerSlider from '@/components/Slider/TrailerSlider';
import Footer from '@/components/footer';
import MovieSliderLayout from '@/components/layout/MovieSliderLayout';
import Loader from '@/components/loader/Loader';
import { discover_movies, img_path, top_rated, trending_movies, tv_shows } from '@/constants/endpoints';
import { TRAILERS } from '@/constants/trailers';
import { AppContext } from '@/context';
import { fetchBookmarks } from '@/services/bookmarks.service';
import axios from 'axios';
import React, { useContext } from 'react'
import { MdKeyboardArrowRight } from "react-icons/md"

const Home = () => {
    const { discoverMovies, setDiscoverMovies, trendingMovies, setTrendingMovies, topRatedMovies, setTopRatedMovies, tvShows, setTvShows } = useContext(AppContext)

    const [topTrends, setTopTrends] = React.useState<any>([]);
    const [topTrendsImages, setTopTrendsImages] = React.useState<any>([]);
    const [loading, setLoading] = React.useState<boolean>(false)
    const [topTrendIDS, setTopTrendIDS] = React.useState<any>([]);

    const getMovies = (url: string) => {
        const options = {
            method: 'GET',
            url: url,
            params: { api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY, language: 'en-US', page: 1 }
        };
        setLoading(true)

        axios.request(options).then(function (response) {
            if (url.includes(discover_movies)) {
                setDiscoverMovies(response.data.results)
            }
            else if (url.includes(trending_movies)) {
                setTrendingMovies(response.data.results)
            }
            else if (url.includes(tv_shows)) {
                setTvShows(response.data.results)
            }
            else if (url.includes(top_rated)) {
                setTopRatedMovies(response.data.results)
            }
            setLoading(false)
        }).catch(function (error) {
            console.error(error);
            setLoading(false)
        });
    }

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await fetch(trending_movies);
                const data = await response.json();
                setLoading(false)
                setTopTrends(data.results.slice(6, 10));
                const images = data.results.slice(6, 10).map((movie: { backdrop_path: string; }) => movie.backdrop_path);
                const movieIDS = data.results.slice(0, 4).map((movie: any) => movie.id);
                setTopTrendIDS(movieIDS)
                const imagesWithPrefix = images.map((image: any) => `${img_path}${image}`);
                setTopTrendsImages(imagesWithPrefix);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getMovies(discover_movies)
        getMovies(trending_movies)
        getMovies(top_rated)
        getMovies(tv_shows)
        fetchData();
    }, []);

    return (
        <div>
            {loading ? (
                <div className='w-screen h-screen flex justify-center items-center'>
                    <Loader />
                </div>
            ) : (
                <div className=''>
                    <TrailerSlider images={TRAILERS} autoSlideDuration={5000} />
                    <main className='min-h-screen  lg:px-10 mx-auto '>
                        <MovieSliderLayout title="top trends" movieArray={trendingMovies} link='/trending' />
                        <MovieSliderLayout title="discover movies" movieArray={discoverMovies} link="discover" />
                        <div className='px-4'>
                            <h2 className='text-2xl font-semibold capitalize'>More for You</h2>
                            <ImageSlider images={topTrendsImages} autoSlideDuration={5000} data={topTrends} />
                        </div>
                        <MovieSliderLayout title="Popular movies" movieArray={topRatedMovies} link="top_rated" />
                        <MovieSliderLayout title="tv shows" movieArray={tvShows} link='
                        tv_shows'/>
                    </main>
                    <Footer />
                </div>
            )}
        </div>
    )
}

export default Home
