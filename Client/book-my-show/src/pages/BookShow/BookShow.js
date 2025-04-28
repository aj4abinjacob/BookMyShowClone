import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getShowDetails } from "../../calls/shows";
import Navbar from "../../Components/NavBar/NavBar";
import { Card, Col, Row, message } from "antd";
import './BookShow.css';

function BookShow() {
    const params = useParams();
    const navigate = useNavigate();
    const [showDetails, setShowDetails] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const fetchShowData = async () => {
      try {
        const response = await getShowDetails(params.showId);
        if(response.status === 200) {
          setShowDetails(response.data.show);
          console.log("Show details fetched successfully:", response.data.show);
        }
      } catch(err) {
        console.error("Error fetching show data:", err);
      }
    }

    useEffect(() => {
      console.log("BookShow component mounted with params:", params);
      fetchShowData();
    }, [params.showId]);

    const { movieId, showId } = params;
    console.log("Movie ID:", movieId);      
    console.log("Show ID:", showId);

    const getSeats = () => {
      const columns = 12;
      const totalSeats = showDetails.totalSeats > 120 ? 120 : showDetails.totalSeats;
      const rows = Math.ceil(totalSeats / columns);
    
      let allRows = [];
      for (let i = 0; i < rows; i++) {
        allRows.push(i);
      }
    
      let allColumns = [];
      for (let j = 0; j < columns; j++) {
        allColumns.push(j);
      }
    
      const handleSeatSelect = (seatNumber) => {
        seatNumber = seatNumber.toString();
    
        if (showDetails.bookedSeats.includes(seatNumber)) {
          message.error("This seat is already booked!");
          return;
        }
    
        if (!selectedSeats.includes(seatNumber)) {
          setSelectedSeats([...selectedSeats, seatNumber]);
          return;
        }
    
        const updatedSelectedSeats = selectedSeats.filter((seat) => seat != seatNumber);
        setSelectedSeats(updatedSelectedSeats);
      }
    
      return (
        <div className="seat-container">
          <div className="screen-container">
            <div className="screen">Screen</div>
          </div>
          <div className="seats-grid">
            {allRows.map((row) => (
              <div className="seat-row" key={`row-${row}`}>
                {allColumns.map((col) => {
                  let seatNumber = row * columns + col + 1;
                  
                  if (seatNumber > totalSeats) return null;
                  
                  const isSeatBooked = showDetails.bookedSeats.includes(seatNumber.toString());
                  let seatClass = "seat";
                  
                  if (isSeatBooked) {
                    seatClass += " booked";
                  }
                  
                  if (selectedSeats.includes(seatNumber.toString())) {
                    seatClass += " selected";
                  }
                  
                  return (
                    <button 
                      key={`seat-${seatNumber}`}
                      onClick={() => handleSeatSelect(seatNumber)} 
                      className={seatClass}
                      disabled={isSeatBooked}
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          
          <div className="seat-info">
            <div className="seat-types">
              <div className="seat-type">
                <div className="seat-example"></div>
                <span>Available</span>
              </div>
              <div className="seat-type">
                <div className="seat-example booked"></div>
                <span>Booked</span>
              </div>
              <div className="seat-type">
                <div className="seat-example selected"></div>
                <span>Selected</span>
              </div>
            </div>
          </div>
          
          <div className="selection-summary">
            <div className="flex-1">
              Selected Seats: <span>{selectedSeats.join(", ")}</span>
            </div>
            <div className="flex-shrink-0 ms-3">
              Total Price: <span>Rs. {selectedSeats.length * showDetails.ticketPrice}</span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        <Navbar />
        {showDetails && (
          <div className="bookshow-container">
            <Row gutter={[24, 24]}>
              <Col xs={24} md={8} lg={6}>
                <img 
                  src={showDetails.movie.poster} 
                  alt={showDetails.movie.movieName}
                  style={{ width: '200px', borderRadius: '8px' }}
                  className="max-width-300"
                />
              </Col>
              
              <Col xs={24} md={16} lg={18}>
                <Card
                  title={
                    <div className="movie-title-details">
                      <h1>{showDetails.movie.movieName}</h1>
                      <p>
                        Theatre: {showDetails.theatre.name}, {showDetails.theatre.address}
                      </p>
                    </div>
                  }
                  extra={
                    <div className="show-details">
                      <h3>Show Time: {showDetails.time}</h3>
                      <h4>Ticket Price: Rs. {showDetails.ticketPrice}</h4>
                      <h4>Total Seats: {showDetails.totalSeats}</h4>
                      <h4>Available: {showDetails.totalSeats - showDetails.bookedSeats.length}</h4>
                    </div>
                  }
                >
                  <p>{showDetails.movie.description}</p>
                  <div className="movie-data">
                    <p>Duration: <span>{showDetails.movie.duration} minutes</span></p>
                    <p>Genre: <span>{showDetails.movie.genre.join(", ")}</span></p>
                    <p>Language: <span>{showDetails.movie.language}</span></p>
                  </div>
                </Card>
              </Col>
            </Row>

            <div className="seat-selection-section">
              <h2>Select Your Seats</h2>
              {getSeats()}
            </div>
          </div>
        )}
      </>
    );
  }
  
export default BookShow;