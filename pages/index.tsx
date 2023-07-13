/* eslint-disable react-hooks/exhaustive-deps */
import ImageSlider from '@/components/Slider/ImageSlider'
import TrailerSlider from '@/components/Slider/TrailerSlider';
import Footer from '@/components/footer';
import MovieSliderLayout from '@/components/layout/MovieSliderLayout';
import Loader from '@/components/loader/Loader';
import { discover_movies, img_path, now_showing, top_rated, trending_movies, tv_shows, upcoming_movies } from '@/constants/endpoints';
import { TRAILERS } from '@/constants/trailers';
import { AppContext } from '@/context';
import axios from 'axios';
import React, { useContext } from 'react'

const Home = () => {
    const { discoverMovies, setDiscoverMovies, trendingMovies, setTrendingMovies, topRatedMovies, setTopRatedMovies, tvShows, setTvShows, upcomingMovies, setUpcomingMovies, showSidebar, currentMovies,setCurrentMovies } = useContext(AppContext)

    const [topTrends, setTopTrends] = React.useState<any>([]);
    const [topTrendsImages, setTopTrendsImages] = React.useState<any>([]);
    const [loading, setLoading] = React.useState<boolean>(false)
 
    const getMovies = async(url: string) => {
        // setLoading(true)
        const options = {
            method: 'GET',
            url: url,
            params: { api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY, language: 'en-US', page: 1 }
        };

       await axios.request(options).then(function (response) {
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
            else if (url.includes(upcoming_movies)) {
                setUpcomingMovies(response.data.results)
            }
            else if(url.includes(now_showing)){
                setCurrentMovies(response.data.results)
                 setTopTrends(response.data.results.slice(0, 10));
                 const images = response.data.results
                   .slice(0, 10)
                   .map(
                     (movie: { backdrop_path: string }) => movie.backdrop_path,
                   );
                 const imagesWithPrefix = images.map(
                   (image: any) => `${img_path}${image}`,
                 );
                 setTopTrendsImages(imagesWithPrefix);
            }
            setLoading(false)
        }).catch(function (error) {
            console.error(error);
            setLoading(false)
        });
    }

    React.useEffect(() => {
        getMovies(discover_movies)
        getMovies(trending_movies)
        getMovies(top_rated)
        getMovies(upcoming_movies)
        getMovies(now_showing)
        getMovies(tv_shows)
    }, []);

    return (
        <div>
            {loading ? (
                <div className={`w-screen h-screen flex justify-center items-center ${showSidebar&&"overflow-hidden"}`}>
                    <Loader />
                </div>
            ) : (
                <div className=''>
                    <TrailerSlider images={TRAILERS} autoSlideDuration={5000} />
                    <main className='min-h-screen  lg:px-10 mx-auto '>
                        <MovieSliderLayout title="top trends" movieArray={trendingMovies} link='/trending' />
                        <MovieSliderLayout title="now showing in cinemas" movieArray={currentMovies} link='/now_showing' />
                        
                        <MovieSliderLayout title="discover movies" movieArray={discoverMovies} link="discover" />
                        <div className='px-4'>
                            <h2 className='text-2xl font-semibold capitalize'>More for You</h2>
                            <ImageSlider images={topTrendsImages} autoSlideDuration={5000} data={topTrends} />
                        </div>
                        <MovieSliderLayout title="Popular movies" movieArray={topRatedMovies} link="top_rated" />
                        <MovieSliderLayout title="Coming Soon" movieArray={upcomingMovies} link="coming_soon" />
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
