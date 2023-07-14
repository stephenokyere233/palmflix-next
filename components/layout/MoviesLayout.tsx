import { TABS } from '@/constants/TABS';
import Link from 'next/link';
import React, { ReactNode } from 'react'
import { FaBars, FaSearch } from 'react-icons/fa';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import MovieCard from '../Cards/MovieCard';
import Loader from '../loader/Loader';
import { useRouter } from 'next/router';
import Sidebar from '../Nav';
import MovieLayoutMeta from '../Meta/MovieLayoutMeta';

type moviesLayoutProps = {
    children: React.ReactNode,
    currentPage?: number,
    totalPages?: number,
    title: string
    actionNext: () => void
    actionPrev: () => void
}

const MoviesLayout: React.FC<moviesLayoutProps> = ({ children, currentPage, totalPages, title, actionNext, actionPrev }) => {
    const router = useRouter()

    return (
      <>
      <MovieLayoutMeta title={title}/>
      <section className="flex flex-1 h-[91vh]">
        <Sidebar />
        <main className=" flex flex-col flex-1">
          <header className="h-16 flex items-center justify-between lg:px-20 cursor-pointer">
            <MdKeyboardArrowLeft size={28} onClick={actionPrev} />
            <h3 className="text-xl">{title}</h3>
            <MdKeyboardArrowRight size={28} onClick={actionNext} />
          </header>
          <section className=" p-4 h-[80vh] flex-1 overflow-y-scroll">
            <div className=" flex justify-center  px-6  gap-6 gap-y-10 flex-wrap h-full items-center ">
              {children}
            </div>
          </section>
        </main>
      </section>
      </>
    );
}

export default MoviesLayout
