
import { useParams } from "react-router-dom";

function BookShow() {
    const params = useParams();

    console.log("BookShow component mounted with params:", params);
    const { movieId, showId } = params;
    console.log("Movie ID:", movieId);      
    console.log("Show ID:", showId);

  return (
    <div>
      <h1>Book Show</h1>
      <p>Book your favorite shows here!</p>
    </div>
  );
}
export default BookShow;