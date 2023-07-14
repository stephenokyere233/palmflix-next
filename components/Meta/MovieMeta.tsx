import { img_path } from "@/constants/endpoints";
import { mergeObjects } from "@/utils/mergeObj.util";
import Head from "next/head";
import React, { FC, useEffect, useState } from "react";

interface MovieData {
//   title: string;
//   description: string;
//   image: string;
  id: string;
}

const MovieMeta: FC<MovieData> = ({ id }) => {
  const [movieInfo, setMovieInfo] = useState<any>(null);
  const fetchMovieData = async () => {
    try {
      const [movieDataRes, tvDataRes] = await Promise.all([
        fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
        ),
        fetch(
          `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
        ),
      ]);

      if (!movieDataRes.ok && !tvDataRes.ok) {
        throw new Error("Failed to fetch movie and TV data");
      }

      const [movieData, tvData] = await Promise.all([
        movieDataRes.json(),
        tvDataRes.json(),
      ]);
      setMovieInfo(mergeObjects(movieData, tvData));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(()=>{
    fetchMovieData()
  },[])
  return (
    <Head>
      <title>{movieInfo.title}</title>
      <meta name="title" content={movieInfo.title} />
      <meta name="description" content={movieInfo.overview} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://palmflix.vercel.app" />
      <meta property="og:title" content={movieInfo.title} />
      <meta property="og:description" content={movieInfo.overview} />
      <meta
        property="og:image"
        content={`${img_path}${
          movieInfo.backdrop_path || movieInfo.poster_path
        }`}
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://palmflix.vercel.app" />
      <meta property="twitter:title" content={movieInfo.title} />
      <meta property="twitter:description" content={movieInfo.overview} />
      <meta
        property="twitter:image"
        content={`${img_path}${
          movieInfo.backdrop_path || movieInfo.poster_path
        }`}
      />
    </Head>
  );
};

export default MovieMeta;
