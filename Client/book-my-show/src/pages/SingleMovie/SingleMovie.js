import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getMovieById } from "../../calls/movies";
import NavBar from "../../Components/NavBar/NavBar";


function SingleMovie() {
    const [movie, setMovie] = useState(null);
    const params = useParams();

    const getMovie = async () => {

        const movieApiResponse = await getMovieById(params.id);
        if (movieApiResponse.status === 200) {
            setMovie(movieApiResponse.data.movies);
        } else {
            console.error("Error fetching movie:", movieApiResponse.data.message);
        }
    }
    useEffect(() => {
        getMovie();
    }, []);

  return (
    <div>
        <NavBar />
        {movie && (
            <div>
                <h1>{movie.title}</h1>
                <p>{movie.description}</p>
                <img src={movie.image} alt={movie.title} />
            </div>
        )}
        {!movie && <p>Loading...</p>}
        <h1>Movie Details</h1>
        <h1>Movie Title: {movie ? movie.movieName : "Loading..."}</h1>
        <h1>Movie Description: {movie ? movie.description : "Loading..."}</h1>
        <h1>Movie Image: {movie ? <img src={movie.image} alt={movie.title} /> : "Loading..."}</h1>
        <h1>Movie ID: {movie ? movie._id : "Loading..."}</h1>
        <h1>Movie Release Date: {movie ? movie.releaseDate : "Loading..."}</h1>
        <h1>Movie Duration: {movie ? movie.duration : "Loading..."}</h1>
        <h1>Movie Language: {movie ? movie.language : "Loading..."}</h1>
        <h1>Movie Genre: {movie ? movie.genre : "Loading..."}</h1>

    </div>
  );
}

export default SingleMovie;