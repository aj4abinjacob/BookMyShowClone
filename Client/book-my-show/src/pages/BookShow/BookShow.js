
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getShowDetails } from "../../calls/shows";
import  { NavBar } from "../../Components/NavBar/NavBar";

function BookShow() {
    const params = useParams();

    const [showDetails, setShowDetails] = useState(null);

    const fetchShowData = async ()=>{
      try{
        const response = await getShowDetails(params.showId);
        if(response.status === 200){
          setShowDetails(response.data.show);
          console.log("Show details fetched successfully:", response.data.show);
        }
      }
      catch(err){
        console.error("Error fetching show data:", err);
      }
    }

    console.log("BookShow component mounted with params:", params);
    const { movieId, showId } = params;
    console.log("Movie ID:", movieId);      
    console.log("Show ID:", showId);

    return (
      <>
        <Navbar />
        <div>
          <h1>Book Show</h1>
          <p>Book your favorite shows here!</p>
        </div>
      </>
    );
  }
  
export default BookShow;