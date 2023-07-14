import Head from "next/head";
import React from "react";

const AppMeta = () => {
  return (
    <Head>
      <title>Trailers Home </title>
      <meta name="title" content="Trailers Home " />
      <meta
        name="description"
        content="Introducing the web application that will change the way you watch movies. Trailer's Home has everything you need to make movie recommendations and bookmarking a breeze. Let's dive in!"
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://palmflix.vercel.app" />
      <meta property="og:title" content="Trailers Home " />
      <meta
        property="og:description"
        content="Introducing the web application that will change the way you watch movies. Trailer's Home has everything you need to make movie recommendations and bookmarking a breeze. Let's dive in!"
      />
      <meta
        property="og:image"
        content="https://res.cloudinary.com/devsteveserver/image/upload/v1689330448/trailers_mafs2x.jpg"
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://palmflix.vercel.app" />
      <meta property="twitter:title" content="Trailers Home " />
      <meta
        property="twitter:description"
        content="Introducing the web application that will change the way you watch movies. Trailer's Home has everything you need to make movie recommendations and bookmarking a breeze. Let's dive in!"
      />
      <meta
        property="twitter:image"
        content="https://res.cloudinary.com/devsteveserver/image/upload/v1689330448/trailers_mafs2x.jpg"
      />
    </Head>
  );
};

export default AppMeta;
