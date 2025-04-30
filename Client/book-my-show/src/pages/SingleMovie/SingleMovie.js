import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getMovieById } from "../../calls/movies";
import NavBar from "../../Components/NavBar/NavBar";
import { Flex, Button } from "antd";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { getShowsForMovie } from "../../calls/shows";


function SingleMovie() {
    const [movie, setMovie] = useState(null);
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [shows, setShows] = useState([]);
    const params = useParams();
    const navigate = useNavigate();

    const getMovie = async () => {

        const movieApiResponse = await getMovieById(params.id);
        if (movieApiResponse.status === 200) {
            setMovie(movieApiResponse.data.movies);
        } else {
            console.error("Error fetching movie:", movieApiResponse.data.message);
        }
    }
    
    const getAllShowsForSelectedMovie = async () => {
        console.log(`Fetching all shows for selected movie ${params.id} on date ${date}`);
        const showsData = await getShowsForMovie(params.id, date);
        
        if (showsData.status === 200) {
          console.log("Fetched shows data:", showsData.data.shows);
          setShows(showsData.data.shows);
        } else if (showsData.status === 404) {
          // No shows available
          setShows([]);
        } else {
          console.error("Error fetching shows data:", showsData.data.message);
          setShows([]);
        }
      }

    useEffect(() => {
        getAllShowsForSelectedMovie();
    }, [date]);

    useEffect(() => {
        getMovie();
    }, []);

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        navigate(`/movie/${params.id}?date=${selectedDate}`);
    }


  return (
    <div>
        <NavBar />
        {movie && (
            <div  style={{ margin: '20px' }}>
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

                

            </Flex>
            <hr/>
            <div>
                <h2>Book Tickets</h2>
                <label>Choose the date</label>
                <input type="date" value={date} onChange={(e) => handleDateChange(e)} />
                
                {/* Show theaters and showtimes */}
                {shows.length > 0 ? (
                    <div>
                        <h3>Available Theaters and Showtimes</h3>
                        {/* Group shows by theater */}
                        {Object.values(shows.reduce((theaters, show) => {
                        // Create theater entry if it doesn't exist
                        if (!theaters[show.theatre._id]) {
                            theaters[show.theatre._id] = {
                            theater: show.theatre,
                            showtimes: []
                            };
                        }
                        // Add this showtime to the theater
                        theaters[show.theatre._id].showtimes.push({
                            id: show._id,
                            time: show.time,
                            seats: show.seats
                        });
                        return theaters;
                        }, {})).map((theaterInfo, index) => (
                        <div key={index} style={{ marginBottom: "20px" }}>
                            <h4>{theaterInfo.theater.name} - {theaterInfo.theater.location}</h4>
                            <div style={{ display: "flex", gap: "10px" }}>
                            {theaterInfo.showtimes.map((showtime, idx) => (
                                <Button
                                key={idx}
                                onClick={() => navigate(`/movie/${params.id}/book-show/${showtime.id}`)}
                                color="default"
                                variant="dashed"
                                style={{ margin: "5px" }}
                                >
                                {showtime.time}
                                </Button>
                            ))}
                            </div>
                        </div>
                        ))}
                    </div>
                    ) : (
                    <p>No shows available for this movie on the selected date.</p>
                    )}
                </div>
            </div>

        )}
        
    </div>
  );
}

export default SingleMovie;