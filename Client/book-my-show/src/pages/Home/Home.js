import { useEffect } from "react";
import { getAllMovies } from "../../calls/movies";
import MovieList from "../../Components/MovieList";
import NavBar from "../../Components/NavBar/NavBar";
import { Input, Row, Col } from "antd";
function Home() {


  const fetchMovies = async() => {
    const response = await getAllMovies();
    if (response.status === 200) {
      console.log("Movies fetched successfully:", response.data);
    } else {
      console.error("Error fetching movies:", response);
    }
  }
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
      <h1>Book My Show</h1>
      <h2>Welcome to the Book My Show clone!</h2>
      <p>Explore the latest movies and book your tickets online.</p>
      <h2>Featured Movies</h2>
      <MovieList/>
    </div>
  );
}
export default Home;