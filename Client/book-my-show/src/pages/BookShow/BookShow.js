
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { getShowDetails } from "../../calls/shows";
import Navbar from "../../Components/NavBar/NavBar";
import { Card, Col, Row } from "antd";
import { message } from "antd";

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
    useEffect(() => {
      console.log("BookShow component mounted with params:", params);
      fetchShowData();
    }, [params.showId]);

    console.log("BookShow component mounted with params:", params);
    const { movieId, showId } = params;
    console.log("Movie ID:", movieId);      
    console.log("Show ID:", showId);

    return (
      <>
        <Navbar />
        {showDetails && (
          <div>
            <Row gutter={24}>
              <Col span={24}>
                <Card
                  title={
                    <div>
                      <h1>{showDetails.movie.movieName}</h1>
                      <p>
                        Theatre: {showDetails.theatre.name}, {showDetails.theatre.address}
                      </p>
                    </div>
                  }
                  extra={
                    <>
                      <div>
                        <h3>Show Time: {showDetails.time}</h3>
                      </div>
                      <h4>
                        Ticket Price: {showDetails.ticketPrice}
                      </h4>
                      <h4>
                        Total Seats: {showDetails.totalSeats}
                      </h4>
                      <h4>
                        Available Seats: {showDetails.totalSeats - showDetails.bookedSeats.length}
                      </h4>
                    </>
                  }
                  style={{ width: "100%" }}
                >
                  <p>{showDetails.movie.description}</p>
                  <p>Duration: {showDetails.movie.duration} minutes</p>
                  <p>Genre: {showDetails.movie.genre.join(", ")}</p>
                  <p>Language: {showDetails.movie.language}</p>
                </Card>
              </Col>
            </Row>
          </div>
        )}
      </>
    );
  }
  
export default BookShow;