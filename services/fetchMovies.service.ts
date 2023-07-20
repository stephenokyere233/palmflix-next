/**
 * 
 * @param movieID:string 
 * @param media_type:string 
 * @returns {movieInfo_,movieCast_}
 */
export const fetchMovieData = async (movieID: string, media_type: string) => {
  if (!movieID || !media_type) return;
  let movieInfo_ = [];
  let movieCast_ = [];
  let error_:boolean=false
  try {
    const [movieDataRes, movieCastRes] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/${media_type}/${movieID}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
      ),

      fetch(
        `https://api.themoviedb.org/3/${media_type}/${movieID}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`,
      ),
    ]);

    if (!movieDataRes.ok && !movieCastRes.ok) {
      throw new Error("Failed to fetch movie data");
    }

    const [movieData, movieCast] = await Promise.all([
      movieDataRes.json(),
      movieCastRes.json(),
    ]);
    movieInfo_ = movieData;
    movieCast_ = movieCast;
  } catch (error) {
    console.error(error);
    error_=true
  }
  return { movieInfo_, movieCast_ ,error_};
};
