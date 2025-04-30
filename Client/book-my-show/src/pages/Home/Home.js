import { useEffect } from "react";
import { getAllMovies } from "../../calls/movies";
import NavBar from "../../Components/NavBar/NavBar";
import { Input, Row, Col } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

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
                <div 
                  className="movie-card" 
                  onClick={() => {
                    navigate(`/movie/${movie._id}?date=${moment().format("YYYY-MM-DD")}`);
                  }}
                  style={{ 
                    borderRadius: '8px', 
                    overflow: 'hidden',
                    backgroundColor: '#f8f9fa',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    padding: '12px',
                    transition: 'transform 0.2s ease-in-out',
                    cursor: 'pointer'
                  }}>
                  <img
                    src={movie.poster}
                    alt={movie.movieName}
                    style={{ 
                      width: "100%", 
                      height: "300px", 
                      objectFit: "cover",
                      borderRadius: '4px'
                    }}
                  />
                  <h3 style={{ 
                    color: '#1a1a1a',
                    fontSize: '18px',
                    fontWeight: '600',
                    marginBottom: '8px'
                  }}>{movie.movieName}</h3>
                  <p style={{ 
                    color: '#666666',
                    fontSize: '14px',
                    marginBottom: '8px',
                    lineHeight: '1.4'
                  }}>{movie.description}</p>
                  <p style={{ 
                    color: '#1a1a1a',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '4px'
                  }}>Genre: <span style={{ color: '#666666', fontWeight: '400' }}>{movie.genre.join(", ")}</span></p>
                  <p style={{ 
                    color: '#1a1a1a',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '4px'
                  }}>Duration: <span style={{ color: '#666666', fontWeight: '400' }}>{movie.duration} minutes</span></p>
                  <p style={{ 
                    color: '#1a1a1a',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '4px'
                  }}>Language: <span style={{ color: '#666666', fontWeight: '400' }}>{movie.language}</span></p>
                  <p style={{ 
                    color: '#1a1a1a',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '4px'
                  }}>Release Date: <span style={{ color: '#666666', fontWeight: '400' }}>{new Date(movie.releaseDate).toLocaleDateString()}</span></p>
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