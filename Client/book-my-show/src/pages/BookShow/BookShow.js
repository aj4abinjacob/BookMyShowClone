import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getShowDetails } from "../../calls/shows";
import Navbar from "../../Components/NavBar/NavBar";
import { Card, Col, Row, message } from "antd";
import './BookShow.css';
import StripeCheckout from "react-stripe-checkout";
import { makePayment } from "../../calls/booking";
import { createBooking } from "../../calls/booking";

function BookShow() {
    const params = useParams();
    const navigate = useNavigate();
    const [showDetails, setShowDetails] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();

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

    const onToken = async (token) => {

      try{
        console.log("Token received:", token);
        const response = await makePayment({
          token,
          amount: selectedSeats.length * showDetails.ticketPrice * 100,
        });
        console.log("Payment response:", response);

        if(response.data.success) {
          messageApi.success("Payment successful! Booking confirmed.");
          const bookingData = {
            show: params.showId,
            seats: selectedSeats,
            transactionId: response.data.transactionId,
          };

          const bookingResponse = await createBooking(bookingData);

          if(bookingResponse.data.success === true) {
            messageApi.success("Booking successful!");
            console.log("Booking response:", bookingResponse);
            navigate("/");
          }
          else {
            messageApi.error("Booking failed. Please try again.");
          }

        }
        else {
          messageApi.error("Payment failed. Please try again.");
        }

      }catch(err) {
        console.error("Error making payment:", err);
        messageApi.error("Payment failed. Please try again.");
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
    
        const updatedSelectedSeats = selectedSeats.filter((seat) => seat !== seatNumber);
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
            {selectedSeats.length > 0 && (
              <div className="payment-button-container">
                 <StripeCheckout
                    key="stripe-checkout"
                    token={onToken}
                    stripeKey="pk_test_51RItpAPs6SzZXfwZ7WJhrtrHoHJQgEKFiqqjRfzRlKT9HbCxrjUxThumz8kwt5i5uprYZF0FubKJVJ1naO2o0e3m00dy9iplAV"
                    amount={selectedSeats.length * showDetails.ticketPrice * 100}
                    currency="INR"
                  >
                   <button className="stripe-button-custom">Pay with Card</button>
                 </StripeCheckout>
              </div>
             )}
          </div>
        </div>
      );
    }

    return (
      <>
        <Navbar />
        {contextHolder}
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

              {
                /* Stripe Checkout is now rendered inside getSeats() */
                /*
                selectedSeats.length > 0 && (
                <StripeCheckout 
                key="stripe-checkout"
                  token={onToken}
                  stripeKey="pk_test_51RItpAPs6SzZXfwZ7WJhrtrHoHJQgEKFiqqjRfzRlKT9HbCxrjUxThumz8kwt5i5uprYZF0FubKJVJ1naO2o0e3m00dy9iplAV"/>
                  
                )
                */
              }
            </div>
          </div>
        )}
      </>
    );
  }
  
export default BookShow;