import React, { FC, useState } from 'react'
import { MdKeyboardArrowRight } from 'react-icons/md';
import MovieCard from '../Cards/MovieCard';
import Link from 'next/link';

const MovieSliderLayout: FC<{ title: string, movieArray: any[],link:string }> = ({ title, movieArray,link }) => {
    const [translate,setTranslate]=useState("0")
    return (
        <section className='p-4 relative flex flex-col w-full gap-4'>
            <div className='flex justify-between w-full items-center'>
                <h2 className='text-2xl font-semibold capitalize'>
                    {title}
                </h2>
                <Link href={link||""}>
                <span className='flex items-center opacity-50'>
                    <p>
                        See all
                    </p>
                    <MdKeyboardArrowRight size={32} className='opactity-[100%]' />
                </span>
                </Link>
            </div>
                <MdKeyboardArrowRight onClick={()=>setTranslate("200px")} size={32} className='absolute top-[50%] right-4' />
            <div className={` w-[92vw] movie-slider overflow-x-scroll flex gap-10 translate-x-[${translate}]`}>

                {
                    movieArray && movieArray.slice(0, 10).map((movie: { title: any; name: any; id: any; poster_path: any; }) => {
                        const { title, name, id, poster_path } = movie
                        return (
                            <MovieCard key={id} title={title || name} imageURL={poster_path} movieID={id} />
                        )
                    })
                }

            </div>
        </section>
    )
}

export default MovieSliderLayout
