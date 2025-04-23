import { useEffect } from "react";
import { getAllMovies } from "../../calls/movies";
import MovieList from "../../Components/MovieList";
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
      <h1>Home</h1>
      <p>Welcome to the Book My Show clone!</p>
      <MovieList/>
    </div>
  );
}
export default Home;