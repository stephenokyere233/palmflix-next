import MovieCard from '@/components/Cards/MovieCard'
import { AppContext } from '@/context'
import React, { useContext} from 'react'
import Image from 'next/image'
import Sidebar from '@/components/Nav'

const Bookmarks = () => {
    const { bookmarkedMovies } = useContext(AppContext)

    const Null = () => {
        return (
            <div className="flex flex-1 h-[90vh] flex-col items-center justify-center text-xl opacity-50">
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
      <div className="w-full h-[90vh] flex">
        <Sidebar />
        {bookmarkedMovies.length < 1 ? (
          <>
            <Null />
          </>
        ) : (
          <div className="max-w-[100rem] mx-auto lg:px-10 flex-1 overflow-y-scroll flex-col flex">
            <h2 className="text-3xl p-2 text-center py-4">My Bookmarks</h2>
            <div className="flex flex-wrap gap-10 justify-center ">
              {bookmarkedMovies &&
                bookmarkedMovies.map((movie:any) => {
                  return <MovieCard movieData={movie} key={movie.id} />;
                })}
            </div>
          </div>
        )}
      </div>
    );
}

export default Bookmarks
