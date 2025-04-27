import { useEffect } from "react";
import { getAllMovies } from "../../calls/movies";
import MovieList from "../../Components/MovieList";
import NavBar from "../../Components/NavBar/NavBar";
import { Input, Row, Col } from "antd";
import { useState } from "react";

function Home() {

  const [movies, setMovies] = useState([]);  // Initialize as empty array instead of null
  const [loading, setLoading] = useState(true);  // Add loading state

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await getAllMovies();
      // Make sure you're accessing the data correctly based on your API response
      setMovies(response.data.movies); // Changed from response.data.data to response.data.movies
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
  
  
  return (
    <div>
      <NavBar/>
      <Row style={{justifyContent:"center",marginTop:"20px"}} className="d-flex justify-content-center w-100">
        <Col lg={{span:12}} xs={{span:24}} >
        <Input placeholder="Type here to search for movies" />
        </Col>
      </Row>
      <Row>
        {movies.length > 0 &&
          movies.map((movie) => (
            <Col
              key={movie._id} // MongoDB gives `_id`
              lg={{ span: 6 }}
              xs={{ span: 12 }}
              style={{ marginTop: "20px" }}
            >
              <div className="movie-card">
                <img
                  src={movie.poster}
                  alt={movie.movieName}
                  style={{ width: "100%", height: "300px", objectFit: "cover" }}
                />
                <h3>{movie.movieName}</h3>
                <p>{movie.description}</p>
                <p>Genre: {movie.genre.join(", ")}</p> {/* genre is an array */}
                <p>Duration: {movie.duration} minutes</p>
                <p>Language: {movie.language}</p>
                <p>
                  Release Date:{" "}
                  {new Date(movie.releaseDate).toLocaleDateString()}
                </p>
              </div>
            </Col>
          ))}
      </Row>

    </div>
  );
}
export default Home;