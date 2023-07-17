import Head from "next/head";
import React, { FC } from "react";

interface MovieData {
  title: string;
  description: string;
  image: string;
}

const MovieMeta: FC<MovieData> = ({ title, description, image }) => {
  return (
    <Head>
      <title>{`Trailers Home - ${title}`}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://palmflix.vercel.app" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://palmflix.vercel.app" />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
};

export default MovieMeta;
