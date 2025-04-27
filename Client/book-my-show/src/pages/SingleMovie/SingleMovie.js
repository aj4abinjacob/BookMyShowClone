import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getMovieById } from "../../calls/movies";
import NavBar from "../../Components/NavBar/NavBar";
import { Flex } from "antd";
import moment from "moment";


function SingleMovie() {
    const [movie, setMovie] = useState(null);
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
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
            <Flex gap="large" justify="center" align="center" direction="row">
                <div>
                    <img src={movie.poster} alt={movie.title} width={200} />
                </div>

                <div>
                    <h1>{movie.movieName}</h1>
                    <p>{movie.language}</p>
                    <p>{movie.genre}</p>
                    <p>{movie.duration} minutes</p>
                    <p>{new Date(movie.releaseDate).toLocaleDateString()}</p>
                    <h2>About the Movie</h2>
                    <p>{movie.description}</p>
                </div>
                <hr/>
                <div>
                    <h2>Book Tickets</h2>
                    <p>Showtimes and booking options will be available here.</p>
                    <label>Choose the date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                    <p>Selected date: {date}</p>
                    <p>Available showtimes will be displayed here.</p>
                </div>

            </Flex>
        )}
        
    </div>
  );
}

export default SingleMovie;