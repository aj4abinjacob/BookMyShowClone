import { useEffect } from "react";
import { getAllMovies } from "../../calls/movies";
import NavBar from "../../Components/NavBar/NavBar";
import { Input, Row, Col } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

  const [movies, setMovies] = useState([]);  // Initialize as empty array instead of null
  const [loading, setLoading] = useState(true);  // Add loading state

  const [searchText, setSearchText] = useState("");

  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await getAllMovies();
      setMovies(response.data.movies); 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const onSearchInputChange = (e) => {
    setSearchText(e.target.value);
  }
  
  
  return (
    <div>
      <NavBar/>
      <Row style={{justifyContent:"center",marginTop:"20px"}} className="d-flex justify-content-center w-100">
        <Col lg={{span:12}} xs={{span:24}} >
        <Input value={searchText} onChange={onSearchInputChange} placeholder="Type here to search for movies" />
        </Col>
      </Row>
      <Row gutter={[16, 24]} style={{ marginTop: "20px", marginLeft: "20px", marginRight: "20px", marginBottom: "20px" }}>
        {loading ? (
          <Col span={24} style={{ textAlign: 'center', marginTop: '50px' }}>
            Loading movies...
          </Col>
        ) : movies && movies.length > 0 ? (
          movies
            .filter((movie) => movie.movieName.toLowerCase().includes(searchText.toLowerCase()))
            .map((movie) => (
              <Col
                key={movie._id}
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
                  <h3 className="cursor-pointer" onClick={() => {
                    navigate(`/movie/${movie._id}`);
                  }}>{movie.movieName}</h3>
                  <p>{movie.description}</p>
                  <p>Genre: {movie.genre.join(", ")}</p>
                  <p>Duration: {movie.duration} minutes</p>
                  <p>Language: {movie.language}</p>
                  <p>Release Date: {new Date(movie.releaseDate).toLocaleDateString()}</p>
                </div>
              </Col>
            ))
        ) : (
          <Col span={24} style={{ textAlign: 'center', marginTop: '50px' }}>
            No movies found.
          </Col>
        )}
      </Row>

    </div>
  );
}
export default Home;